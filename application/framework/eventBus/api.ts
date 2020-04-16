import { Subject, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RegisteredEvents, EventRegistry, ValidEvent, Event, EventBus, EventHandler, EventSubscription } from './types';
import { UnregisteredEventError } from './throws';

/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-throw-statement */

export const createEventRegistry = (initialValue: RegisteredEvents = []): EventRegistry => {
  return new BehaviorSubject<RegisteredEvents>(initialValue.length > 0 ? initialValue : []);
};

export const registerEvents = (eventRegistry: EventRegistry, eventNames: ReadonlyArray<string>): EventRegistry => {
  const registeredEvents: RegisteredEvents = eventRegistry.getValue();
  eventRegistry.next([...registeredEvents, ...eventNames]);
  return eventRegistry;
};

export const isRegisteredEvent = (eventRegistry: EventRegistry, name: string): boolean => {
  return eventRegistry.getValue().includes(name);
};

export const getRegisteredEventNames = (eventRegistry: EventRegistry): readonly string[] => {
  return eventRegistry.getValue();
};

/** Create a new EventBus */
export const createEventBus = (eventNames: readonly string[] = []): EventBus => {
  return {
    subject: new Subject(),
    registry: createEventRegistry(eventNames),
  };
};

/**
 * Publish an Event to all subscribers
 *
 * @throws UnregisteredEventError if the event name is unregistered
 */
export const publishEvent = (eventBus: EventBus) => (event: Event): void => {
  if (!ValidEvent.is(event)) {
    throw new UnregisteredEventError('Event name ${event} is not registered');
  }
  eventBus.subject.next(event);
};

export type EventSubscribeFunction = (eventName: string, handlers: readonly EventHandler[]) => EventSubscription;

/** Subscribe to an event */
export const subscribeToEvent = (eventBus: EventBus): EventSubscribeFunction => (
  eventName: string,
  handlers: readonly EventHandler[],
): EventSubscription => {
  const handleAndPublishResults = (event: unknown): void => {
    const returnedEvents = handlers.flatMap(handler => handler(event as Event));
    returnedEvents.map(returnedEvent => publishEvent(eventBus)(returnedEvent));
  };
  return eventBus.subject
    .pipe(filter((event: unknown) => ValidEvent.is(event) && event.name === eventName))
    .subscribe(handleAndPublishResults);
};
