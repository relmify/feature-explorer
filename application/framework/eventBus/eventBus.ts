/**
 * An event bus for publishing and subscribing to events
 * @packageDocumentation
 */
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { createEventRegistry, EventRegistry } from './eventRegistry';
import { Event, EventHandler, EventSubscription } from './eventTypes';

/* eslint-disable functional/no-return-void, functional/functional-parameters, functional/no-expression-statement */

/** An EventBus allows you to publish and subdscribe to events */
export type EventBus = {
  readonly subject: Subject<Event>;
  readonly registry: EventRegistry;
};

/** Create a new EventBus */
export const createEventBus = (eventNames: readonly string[]): EventBus => {
  return {
    subject: new Subject(),
    registry: createEventRegistry(eventNames),
  };
};

/** Publish an Event to all subscribers */
export const publishEvent = (eventBus: EventBus) => (event: Event): void => eventBus.subject.next(event);

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
    .pipe(filter((event: unknown) => Event.is(event) && event.name === eventName))
    .subscribe(handleAndPublishResults);
};

// export const subscribeToEvent = (eventBus: EventBus) => (
//   eventName: EventName,
//   handler: readonly EventHandler,
// ): EventSubscription => {
//   const handleAndPublishResults = (event: unknown): void => {
//     const returnedEvents = handler(event as Event);
//     returnedEvents.map(returnedEvent => publishEvent(eventBus)(returnedEvent));
//   };
//   return eventBus.subject
//     .pipe(filter((event: unknown) => Event.is(event) && event.name === eventName))
//     .subscribe(handleAndPublishResults);
// };
