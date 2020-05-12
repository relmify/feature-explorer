/**
 * Message Bus Internal types
 * @packageDocumenation
 */
import * as t from 'io-ts';
import { Subject, BehaviorSubject } from 'rxjs';
import { ContractViolationHandler } from './interfaceTypes';

//
// Service name
//
export const MessageBusServiceName = 'MessageBus';

//
// Regular expressions for string validity checks
//
const ServiceNameRegExp = RegExp('^((?=[A-Z])[a-zA-Z0-9_]*(?:[.]?(?=[A-Z])[a-zA-Z0-9_]*)*?[^.])$');
const LocalMessageTypeRegExp = RegExp('^((?=[A-Z])[A-Z0-9_]+)$');
const MessageTypeRegExp = RegExp(
  '^((?=[A-Z])[a-zA-Z0-9_]*([.]?(?=[A-Z])[a-zA-Z0-9_]*)*?[^.])[.]((?=[A-Z])[A-Z0-9_]+)$',
);

//
// Brands for branded types
//
type ServiceNameBrand = { readonly ServiceName: unique symbol };
type LocalMessageTypeBrand = { readonly LocalMessageType: unique symbol };
type MessageTypeBrand = { readonly MessageType: unique symbol };

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
 * A LocalMessageType is a non-empty string that starts with a capital letter and contains only capital letters,
 * numbers, and underscores.
 */
export const LocalMessageType = t.brand(
  t.string,
  (s): s is t.Branded<string, LocalMessageTypeBrand> =>
    typeof s === 'string' && s.length > 0 && LocalMessageTypeRegExp.test(s),
  'LocalMessageType',
);
export type LocalMessageType = t.TypeOf<typeof LocalMessageType>;

/**
 * A Message Type is a string composed of a ServiceName + a dot + a LocalMessageType
 */
export const MessageType = t.brand(
  t.string,
  (s): s is t.Branded<string, MessageTypeBrand> => typeof s === 'string' && s.length > 0 && MessageTypeRegExp.test(s),
  'MessageType',
);
export type MessageType = t.TypeOf<typeof MessageType>;

/**
 * MessageData is any type of data that is sent along with a message
 */
export const MessageData = t.unknown;
export type MessageData = t.TypeOf<typeof MessageData>;

/**
 * A message is an object that can be published on the MessageBus
 */
export const Message = t.type({ messageType: MessageType, data: MessageData });
export type Message = t.TypeOf<typeof Message>;

/**
 * An object that allows unsubscribing from a message type
 */
export type MessageSubscription = {
  // eslint-disable-next-line functional/no-return-void
  readonly unsubscribe: () => void;
};

/**
 * A list of message types which have been registered with the message bus.
 */
export type RegisteredMessageTypes = readonly MessageType[];

/**
 * Keeps track of registered message types.
 */
export type MessageTypeRegistry = BehaviorSubject<RegisteredMessageTypes>;

/**
 * The medium over which messages are published.
 */
export type MessageChannel = Subject<Message>;

/**
 * Packages together the message channel, the message type registry, and the contract violation handler.
 */
export type MessageBus = {
  readonly messageChannel: MessageChannel;
  readonly registry: MessageTypeRegistry;
  readonly contractViolationHandler: ContractViolationHandler;
};
