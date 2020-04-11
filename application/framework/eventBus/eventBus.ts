/**
 * An event bus for publishing and subscribing to events
 * @packageDocumentation
 */

import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Event, EventName, EventData } from './event';
import { createEventRegistry, EventRegistry } from './eventRegistry';

/* eslint-disable functional/no-return-void, functional/functional-parameters */

/** An EventBus allows you to publish and subdscribe to events */
export type EventBus = {
  readonly subject: Subject<Event>;
  readonly registry: EventRegistry;
};

/** An EventHandler is a function that gets called when an event that you subscribe to arrives */
export type EventHandler = (eventData: EventData) => void;

/** An EventSubscription is returned when you subscribe to an event */
export type EventSubscription = {
  /** Call susbsription.unsubscribe() to unsubscribe */
  readonly unsubscribe: () => void;
};

/** Create a new EventBus */
export const createEventBus = (eventNames: ReadonlyArray<string> = []): EventBus => {
  return {
    subject: new Subject(),
    registry: createEventRegistry(eventNames),
  };
};

/** Publish an Event to all subscribers */
export const publishEvent = (eventBus: EventBus) => (event: Event): void => eventBus.subject.next(event);

/** Subscribe to an event */
export const subscribeToEvent = (eventBus: EventBus) => (
  eventName: EventName,
  handler: EventHandler,
): EventSubscription => {
  return eventBus.subject
    .pipe(
      filter((event: unknown) => Event.is(event) && event.name === eventName),
      map((event: unknown) => (event as Event)['data']),
    )
    .subscribe(handler as (value: unknown) => void);
};
