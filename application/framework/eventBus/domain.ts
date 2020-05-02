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

const createEventRegistry = (): dt.EventRegistry => {
  return new BehaviorSubject<dt.RegisteredEvents>([]);
};

const isRegisteredEvent = (eventBus: dt.EventBus, name: dt.EventName): boolean => {
  return eventBus.registry.getValue().includes(name);
};

const publishEvent = (eventBus: dt.EventBus) => (event: dt.Event): void => {
  const errorOrEvent = isRegisteredEvent(eventBus, event.name)
    ? Either.right(event)
    : Either.left(
        new it.ContractViolation(dt.EventBusServiceName, `Unable to publish unregistered event ${event.name}`),
      );

  Either.fold(eventBus.contractViolationHandler, eventBus.eventChannel.next)(errorOrEvent);
};

export const errorsToContractViolation = (componentName: string, validationErrors: t.Errors): it.ContractViolation => {
  const message = PathReporter.report(Either.left(validationErrors)).reduce((acc, cur) => acc + '\n' + cur, '');
  return new it.ContractViolation(componentName, message);
};

export const registerEvents = (eventBus: it.EventBus, eventNames: readonly it.EventName[]): void => {
  const validatedEventNames = eventNames.map(name => dt.EventName.decode(name));

  validatedEventNames.map((errorsOrName: Either.Either<t.Errors, dt.EventName>) =>
    Either.fold(
      // There were validation errors. Report a contract violation.
      (errors: t.Errors) =>
        eventBus.contractViolationHandler(errorsToContractViolation(dt.EventBusServiceName, errors)),
      // No validation errors. Report a contract violation if the name is already registered.
      // Otherwise register the event.
      (name: dt.EventName) =>
        eventBus.registry.value.includes(name)
          ? eventBus.contractViolationHandler(
              new it.ContractViolation(dt.EventBusServiceName, `Unable to register duplicate event ${name}`),
            )
          : eventBus.registry.next([...eventBus.registry.value, name]),
    )(errorsOrName),
  );
};

export const getRegisteredEvents = (eventBus: it.EventBus): readonly it.EventName[] => {
  return eventBus.registry.getValue().map(registeredEvent => dt.EventName.encode(registeredEvent));
};

export const createEventBus = (errorHandler: it.ContractViolationHandler): it.EventBus => {
  return {
    eventChannel: new Subject(),
    registry: createEventRegistry(),
    contractViolationHandler: errorHandler,
  };
};

const handleEvent = (eventBus: dt.EventBus, handlers: readonly it.EventHandler[]) => (
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

const publishEvents = (eventBus: dt.EventBus, eventsToPublish: readonly it.Event[]): void => {
  eventsToPublish.map(event => {
    Either.fold(
      (errors: t.Errors) =>
        eventBus.contractViolationHandler(errorsToContractViolation(dt.EventBusServiceName, errors)),
      (event: dt.Event) => publishEvent(eventBus)(event),
    )(dt.Event.decode(event));
  });
};

const handleEventAndPublishResults = (eventBus: dt.EventBus, handlers: readonly it.EventHandler[]) => (
  event: dt.Event,
): void => {
  const eventsToPublish = handleEvent(eventBus, handlers)(event);
  publishEvents(eventBus, eventsToPublish);
};

export const subscribeToEvent = (eventBus: it.EventBus) => (
  eventName: it.EventName,
  handlers: readonly it.EventHandler[],
): void => {
  eventBus.eventChannel
    .pipe(filter((event: dt.Event) => event.name === eventName))
    .subscribe(handleEventAndPublishResults(eventBus, handlers));
};
