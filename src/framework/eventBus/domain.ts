import { Subject, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PathReporter } from 'io-ts/lib/PathReporter';
import * as Either from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import * as dt from './domainTypes';
import * as it from './interfaceTypes';

/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-throw-statement */

export const errorsToContractViolation = (componentName: string, validationErrors: t.Errors): it.ContractViolation => {
  const message = PathReporter.report(Either.left(validationErrors)).reduce((acc, cur) => acc + '\n' + cur, '');
  return new it.ContractViolation(componentName, message);
};

const createEventRegistry = (): dt.EventRegistry => {
  return new BehaviorSubject<dt.RegisteredEvents>([]);
};

export const createEventBus = (errorHandler: it.ContractViolationHandler): it.EventBus => {
  return {
    eventChannel: new Subject(),
    registry: createEventRegistry(),
    contractViolationHandler: errorHandler,
  };
};

const isRegisteredDomainEventName = (eventBus: dt.EventBus, name: dt.EventName): boolean => {
  return eventBus.registry.getValue().includes(name);
};

const reportPublishUnregisteredViolation = (eventBus: dt.EventBus, eventName: dt.EventName): void => {
  eventBus.contractViolationHandler(
    new it.ContractViolation(dt.EventBusServiceName, `Unable to publish unregistered event ${eventName}`),
  );
};

const publishDomainEvent = (eventBus: dt.EventBus) => (event: dt.Event): void => {
  return isRegisteredDomainEventName(eventBus, event.name)
    ? eventBus.eventChannel.next(event)
    : reportPublishUnregisteredViolation(eventBus, event.name);
};

const handleDomainEvent = (eventBus: dt.EventBus, handlers: readonly it.EventHandler[]) => (
  event: dt.Event,
): readonly it.Event[] => {
  return handlers.flatMap(handler =>
    Either.fold(
      (violation: it.ContractViolation) => {
        eventBus.contractViolationHandler(violation);
        return [];
      },
      (events: readonly it.Event[]) => events,
    )(handler(dt.Event.encode(event))),
  );
};

const reportValidationErrors = (eventBus: dt.EventBus, errors: t.Errors): void => {
  eventBus.contractViolationHandler(errorsToContractViolation(dt.EventBusServiceName, errors));
};

const reportAlreadyRegisteredViolation = (eventBus: dt.EventBus, eventName: dt.EventName): void => {
  eventBus.contractViolationHandler(
    new it.ContractViolation(dt.EventBusServiceName, `Unable to register duplicate event ${eventName}`),
  );
};

export const registerEventNames = (eventBus: it.EventBus, eventNames: readonly it.EventName[]): void => {
  const validatedEventNames = eventNames.map(name => dt.EventName.decode(name));

  validatedEventNames.map((errorsOrName: Either.Either<t.Errors, dt.EventName>) =>
    Either.fold(
      (errors: t.Errors) => reportValidationErrors(eventBus, errors),
      (eventName: dt.EventName) =>
        eventBus.registry.value.includes(eventName)
          ? reportAlreadyRegisteredViolation(eventBus, eventName)
          : eventBus.registry.next([...eventBus.registry.value, eventName]),
    )(errorsOrName),
  );
};

export const registerEventName = (eventBus: it.EventBus, eventName: it.EventName): void => {
  registerEventNames(eventBus, [eventName]);
};

export const getRegisteredEventNames = (eventBus: it.EventBus): readonly it.EventName[] => {
  return eventBus.registry.getValue().map(registeredEvent => dt.EventName.encode(registeredEvent));
};

export const publishEvents = (eventBus: it.EventBus, eventsToPublish: readonly it.Event[]): void => {
  eventsToPublish.map(event => {
    Either.fold(
      (errors: t.Errors) =>
        eventBus.contractViolationHandler(errorsToContractViolation(dt.EventBusServiceName, errors)),
      (event: dt.Event) => publishDomainEvent(eventBus)(event),
    )(dt.Event.decode(event));
  });
};

export const publishEvent = (eventBus: it.EventBus, event: it.Event): void => {
  publishEvents(eventBus, [event]);
};

const reportSubscribeUnregisteredViolation = (eventBus: dt.EventBus, eventName: dt.EventName): void => {
  eventBus.contractViolationHandler(
    new it.ContractViolation(dt.EventBusServiceName, `Unable to subscribe to unregistered event ${eventName}`),
  );
};

const handleDomainEventAndPublishResults = (eventBus: dt.EventBus, handlers: readonly it.EventHandler[]) => (
  event: dt.Event,
): void => {
  const eventsToPublish = handleDomainEvent(eventBus, handlers)(event);
  publishEvents(eventBus, eventsToPublish);
};

const subscribeHandlersToFilteredEventChannel = (
  eventBus: dt.EventBus,
  eventName: dt.EventName,
  handlers: readonly it.EventHandler[],
): void => {
  eventBus.eventChannel
    .pipe(filter((event: dt.Event) => event.name === eventName))
    .subscribe(handleDomainEventAndPublishResults(eventBus, handlers));
};

const subscribeHandlers = (eventBus: it.EventBus) => (eventName: it.EventName) => (
  handlers: readonly it.EventHandler[],
): void => {
  Either.fold(
    (errors: t.Errors) => reportValidationErrors(eventBus, errors),
    (eventName: dt.EventName) => {
      return isRegisteredDomainEventName(eventBus, eventName)
        ? subscribeHandlersToFilteredEventChannel(eventBus, eventName, handlers)
        : reportSubscribeUnregisteredViolation(eventBus, eventName);
    },
  )(dt.EventName.decode(eventName));
};

export const subscribeHandlersToEventName = (
  eventBus: it.EventBus,
  eventName: it.EventName,
  handlers: readonly it.EventHandler[],
): void => {
  subscribeHandlers(eventBus)(eventName)(handlers);
};

export const subscribeHandlerToEventName = (
  eventBus: it.EventBus,
  eventName: it.EventName,
  handler: it.EventHandler,
): void => {
  subscribeHandlersToEventName(eventBus, eventName, [handler]);
};
