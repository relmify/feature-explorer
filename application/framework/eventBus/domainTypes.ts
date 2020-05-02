/**
 * EventBus Internal types
 * @packageDocumenation
 */
import * as t from 'io-ts';
import { Subject, BehaviorSubject } from 'rxjs';
import { ContractViolationHandler } from './interfaceTypes';

//
// Service name
//
export const EventBusServiceName = 'EventBus';

//
// Regular expressions for string validity checks
//
const ServiceNameRegExp = RegExp('^((?=[A-Z])[a-zA-Z0-9_]*(?:[.]?(?=[A-Z])[a-zA-Z0-9_]*)*?[^.])$');
const LocalEventNameRegExp = RegExp('^((?=[A-Z])[A-Z0-9_]+)$');
const EventNameRegExp = RegExp('^((?=[A-Z])[a-zA-Z0-9_]*([.]?(?=[A-Z])[a-zA-Z0-9_]*)*?[^.])[.]((?=[A-Z])[A-Z0-9_]+)$');

//
// Brands for branded types
//
type ServiceNameBrand = { readonly ServiceName: unique symbol };
type LocalEventNameBrand = { readonly LocalEventName: unique symbol };
type EventNameBrand = { readonly EventName: unique symbol };

/**
 * A ServiceName is a non-empty string that consists of 1 or more segments. Each segment must start with a
 * capital letter and contain ony letters, numbers, and underscores. Segments are separated by dot characters.
 * A dot at the beginning or the end of the string is invalid.
 */
export const ServiceName = t.brand(
  t.string,
  (s): s is t.Branded<string, ServiceNameBrand> => typeof s === 'string' && s.length > 0 && ServiceNameRegExp.test(s),
  'ServiceName',
);
export type ServiceName = t.TypeOf<typeof ServiceName>;

/**
 * A LocalEventName is a non-empty string that starts with a capital letter and contains only capital letters,
 * numbers, and underscores.
 */
export const LocalEventName = t.brand(
  t.string,
  (s): s is t.Branded<string, LocalEventNameBrand> =>
    typeof s === 'string' && s.length > 0 && LocalEventNameRegExp.test(s),
  'LocalEventName',
);
export type LocalEventName = t.TypeOf<typeof LocalEventName>;

/**
 * An EventName is a string composed of a ServiceName + a dot + a LocalEventName
 */
export const EventName = t.brand(
  t.string,
  (s): s is t.Branded<string, EventNameBrand> => typeof s === 'string' && s.length > 0 && EventNameRegExp.test(s),
  'EventName',
);
export type EventName = t.TypeOf<typeof EventName>;

/**
 * EventData is any type of data that is sent along with an event
 */
export const EventData = t.unknown;
export type EventData = t.TypeOf<typeof EventData>;

/**
 * An Event is an object that can be published on the EventBus
 */
export const Event = t.type({ name: EventName, data: EventData });
export type Event = t.TypeOf<typeof Event>;

/**
 * An object that allows an event to be un
 */
export type EventSubscription = {
  // eslint-disable-next-line functional/no-return-void
  readonly unsubscribe: () => void;
};

/**
 * A list of event names which have been registered with the event bus.
 */
export type RegisteredEvents = readonly EventName[];

/**
 * Keeps track of registered events.
 */
export type EventRegistry = BehaviorSubject<RegisteredEvents>;

/**
 * The medium over which events are published.
 */
export type EventChannel = Subject<Event>;

/**
 * Packages together the event channel, the event registry, and the contract violation handler.
 */
export type EventBus = {
  readonly eventChannel: EventChannel;
  readonly registry: EventRegistry;
  readonly contractViolationHandler: ContractViolationHandler;
};
