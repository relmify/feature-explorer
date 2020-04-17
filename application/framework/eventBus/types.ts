import * as t from 'io-ts';
import { Subject, BehaviorSubject } from 'rxjs';

/**
 * A ValidServiceName is a non-empty string that consists of 1 or more
 * segments. Each segment must start with a capital letter and contain
 * ony letters, numbers, and underscores. Segments are separated by dot
 * characters. A dot at the beginning or the end of the string is invalid.
 */
const ServiceNameRegExp = RegExp('^((?=[A-Z])[a-zA-Z0-9_]*(?:[.]?(?=[A-Z])[a-zA-Z0-9_]*)*?[^.])$');
type ServiceNameBrand = { readonly ServiceName: unique symbol };
const ServiceName = t.brand(
  t.string,
  (s): s is t.Branded<string, ServiceNameBrand> => typeof s === 'string' && s.length > 0 && ServiceNameRegExp.test(s),
  'ServiceName',
);
type ServiceName = t.TypeOf<typeof ServiceName>;
export { ServiceName };
export type ServiceNameDto = ReturnType<typeof ServiceName.encode>;

/**
 * A ValidLocalEventName is a non-empty string that starts with a capital letter
 * and contains only capital letters, numbers, and underscores.
 */
const LocalEventNameRegExp = RegExp('^((?=[A-Z])[A-Z0-9_]+)$');
type LocalEventNameBrand = { readonly LocalEventName: unique symbol };
const LocalEventName = t.brand(
  t.string,
  (s): s is t.Branded<string, LocalEventNameBrand> =>
    typeof s === 'string' && s.length > 0 && LocalEventNameRegExp.test(s),
  'LocalEventName',
);
type LocalEventName = t.TypeOf<typeof LocalEventName>;
export { LocalEventName };
export type LocalEventNameDto = ReturnType<typeof LocalEventName.encode>;

/**
 * An EventName is a string compoase of a ServiceName + a dot + a LocalEventName
 */
const EventNameRegExp = RegExp('^((?=[A-Z])[a-zA-Z0-9_]*([.]?(?=[A-Z])[a-zA-Z0-9_]*)*?[^.])[.]((?=[A-Z])[A-Z0-9_]+)$');
type EventNameBrand = { readonly EventName: unique symbol };
const EventName = t.brand(
  t.string,
  (s): s is t.Branded<string, EventNameBrand> => typeof s === 'string' && s.length > 0 && EventNameRegExp.test(s),
  'EventName',
);
type EventName = t.TypeOf<typeof EventName>;
export { EventName };
export type EventNameDto = ReturnType<typeof LocalEventName.encode>;

/**
 * EventData is any data that you want to send along with an event
 */
const EventData = t.unknown;
type EventData = t.TypeOf<typeof EventData>;
export { EventData };
export type EventDataDto = ReturnType<typeof EventData.encode>;

const Event = t.type({ name: EventName, data: EventData });
type Event = t.TypeOf<typeof Event>;
export { Event };
export type EventDto = ReturnType<typeof Event.encode>;

/**
 * An EventHandler is a function that gets called when an event that you subscribe to arrives.
 * Any events returned by an EventHandler will be published by the EventBus.
 */
export type EventHandler = (event: Event) => readonly Event[];

/**
 * Maps an event name string to an event handler function
 */
export type GetHandlersFunction = (eventName: EventName) => readonly EventHandler[];

/**
 * An EventSubscription is returned when you subscribe to an event
 * Call subscription.unsubscribe() to unsubscribe.
 */
export type EventSubscription = {
  // eslint-disable-next-line functional/no-return-void
  readonly unsubscribe: () => void;
};

export type RegisteredEvents = readonly EventName[];
export type EventRegistry = BehaviorSubject<RegisteredEvents>;

/** An EventBus allows you to publish and subdscribe to events */
export type EventBus = {
  readonly subject: Subject<Event>;
  readonly registry: EventRegistry;
};

const EventRegistrationInfo = t.type({
  serviceName: ServiceName,
  localEventNames: t.array(LocalEventName),
});
type EventRegistrationInfo = t.TypeOf<typeof EventRegistrationInfo>;
export { EventRegistrationInfo };

export type EventRegistrationInfoDto = ReturnType<typeof EventRegistrationInfo.encode>;

export type GetRegistrationInfoFunction = () => EventRegistrationInfoDto;
