import { Subject, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { right, fold, left } from 'fp-ts/lib/Either';
import { RegisteredEvents, EventRegistry, EventName, Event, EventBus, EventHandler, EventSubscription } from './types';

/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-throw-statement */

export const createEventRegistry = (): EventRegistry => {
  return new BehaviorSubject<RegisteredEvents>([]);
};

export const registerEvents = (eventBus: EventBus, EventNames: readonly EventName[]): void => {
  const eventRegistry = eventBus.registry;
  const registeredEvents: RegisteredEvents = eventRegistry.getValue();
  eventRegistry.next([...registeredEvents, ...EventNames]);
};

export const isRegisteredEvent = (eventBus: EventBus, name: EventName): boolean => {
  return eventBus.registry.getValue().includes(name);
};

export const getRegisteredEventNames = (eventBus: EventBus): readonly EventName[] => {
  return eventBus.registry.getValue();
};

export const createEventBus = (): EventBus => {
  return {
    subject: new Subject(),
    registry: createEventRegistry(),
  };
};

/**
 * Publish an Event to all subscribers
 *
 * Logs an error if unable to publish due to an unregistered event name
 */
export const publishEvent = (eventBus: EventBus) => (event: Event) => {
  const registeredEvent = isRegisteredEvent(eventBus, event.name)
    ? right(event)
    : left(`Unable to publish unregistered event ${event.name}`);
  fold(console.log, eventBus.subject.next)(registeredEvent);
};

export type EventSubscribeFunction = (eventName: EventName, handlers: readonly EventHandler[]) => EventSubscription;

export const subscribeToEvent = (eventBus: EventBus): EventSubscribeFunction => (
  eventName: EventName,
  handlers: readonly EventHandler[],
): EventSubscription => {
  const handleAndPublishResults = (event: Event): void => {
    const returnedEvents = handlers.flatMap(handler => handler(event));
    returnedEvents.map(returnedEvent => publishEvent(eventBus)(returnedEvent));
  };
  return eventBus.subject.pipe(filter((event: Event) => event.name === eventName)).subscribe(handleAndPublishResults);
};
