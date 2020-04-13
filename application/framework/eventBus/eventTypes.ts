import * as t from 'io-ts';

/**
 * The EventName must be a non-empty string. EventName values are dynamically checked
 * against the EventRegistry when subscribing to events.
 */
type EventNameBrand = { readonly EventName: unique symbol };
const EventName = t.brand(
  t.string,
  (s): s is t.Branded<string, EventNameBrand> => typeof s === 'string' && s.length > 0,
  'EventName',
);
type EventName = t.TypeOf<typeof EventName>;
export { EventName };
export type EventNameDTO = ReturnType<typeof EventName.encode>;

/**
 * EventData is any data that you want to send along with an event
 */
const EventData = t.unknown;
type EventData = t.TypeOf<typeof EventData>;
export { EventData };

const Event = t.type({ name: EventName, data: EventData });
type Event = t.TypeOf<typeof Event>;
export { Event };
export type EventDTO = ReturnType<typeof Event.encode>;

/**
 * An EventHandler is a function that gets called when an event that you subscribe to arrives.
 * Any events returned by an EventHandler will be published by the EventBus.
 */
export type EventHandler = (event: Event) => readonly Event[];

/**
 * Maps an event name string to an event handler function
 */
export type GetHandlersFunction = (eventName: string) => readonly EventHandler[];

/**
 * An EventSubscription is returned when you subscribe to an event
 * Call subscription.unsubscribe() to unsubscribe.
 */
export type EventSubscription = {
  // eslint-disable-next-line functional/no-return-void
  readonly unsubscribe: () => void;
};
