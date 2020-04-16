import * as t from 'io-ts';
import { Subject, BehaviorSubject } from 'rxjs';

/**
 * A ValidServiceName is a non-empty string that consists of 1 or more
 * segments. Each segment must start with a capital letter and contain
 * ony letters, numbers, and underscores. Segments are separated by dot
 * characters. A dot at the beginning or the end of the string is invalid.
 */
const ServiceNameRegExp = '/^((?=[A-Z])[a-zA-Z0-9_]*(?:[.]?(?=[A-Z])[a-zA-Z0-9_]*)*?[^.])/';
type ValidServiceNameBrand = { readonly ValidServiceName: unique symbol };
const ValidServiceName = t.brand(
  t.string,
  (s): s is t.Branded<string, ValidServiceNameBrand> =>
    typeof s === 'string' && s.length > 0 && !!ServiceNameRegExp.match(s),
  'ValidServiceName',
);
type ValidServiceName = t.TypeOf<typeof ValidServiceName>;
export { ValidServiceName };
export type ServiceName = ReturnType<typeof ValidServiceName.encode>;

/**
 * A ValidLocalEventName is a non-empty string that starts with a capital letter
 * and contains only capital letters, numbers, and underscores.
 */
const LocalEventNameRegExp = '/^((?=[A-Z])[A-Z0-9_]+)$/';
type ValidLocalEventNameBrand = { readonly ValidLocalEventName: unique symbol };
const ValidLocalEventName = t.brand(
  t.string,
  (s): s is t.Branded<string, ValidLocalEventNameBrand> =>
    typeof s === 'string' && s.length > 0 && !!LocalEventNameRegExp.match(s),
  'ValidLocalEventName',
);
type ValidLocalEventName = t.TypeOf<typeof ValidLocalEventName>;
export { ValidLocalEventName };
export type LocalEventName = ReturnType<typeof ValidLocalEventName.encode>;

/**
 * A ValidEventName is a string compoase of a ValidServiceName + . + a ValidLocalEventName
 */
const EventNameRegExp = '/^((?=[A-Z])[a-zA-Z0-9_]*([.]?(?=[A-Z])[a-zA-Z0-9_]*)*?[^.])[.]((?=[A-Z])[A-Z0-9_]+)$/';
type ValidEventNameBrand = { readonly ValidEventName: unique symbol };
const ValidEventName = t.brand(
  t.string,
  (s): s is t.Branded<string, ValidEventNameBrand> =>
    typeof s === 'string' && s.length > 0 && !!EventNameRegExp.match(s),
  'ValidEventName',
);
type ValidEventName = t.TypeOf<typeof ValidEventName>;
export { ValidEventName };
export type EventName = ReturnType<typeof ValidLocalEventName.encode>;

/**
 * EventData is any data that you want to send along with an event
 */
const ValidEventData = t.unknown;
type ValidEventData = t.TypeOf<typeof ValidEventData>;
export { ValidEventData };
export type EventData = ReturnType<typeof ValidEventData.encode>;

const ValidEvent = t.type({ name: ValidEventName, data: ValidEventData });
type ValidEvent = t.TypeOf<typeof ValidEvent>;
export { ValidEvent };
export type Event = ReturnType<typeof ValidEvent.encode>;

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

export type RegisteredEvents = ReadonlyArray<string>;
export type EventRegistry = BehaviorSubject<RegisteredEvents>;

/** An EventBus allows you to publish and subdscribe to events */
export type EventBus = {
  readonly subject: Subject<Event>;
  readonly registry: EventRegistry;
};
