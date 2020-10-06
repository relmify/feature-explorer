/**
 * Message Bus Internal types
 * @packageDocumenation
 */
import * as t from 'io-ts';
import { Either } from 'fp-ts/lib/Either';
import { Lens } from 'monocle-ts';
import { Subject, BehaviorSubject } from 'rxjs';

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

/* eslint-disable functional/no-class */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-this-expression */
export class ContractViolation extends Error {
  constructor(componentName: string, message: string) {
    const errorName = `${componentName}_Contract_Violation`;
    super(errorName + ': ' + message);
    this.name = errorName;
  }
}
/* eslint-enable functional/no-class */
/* eslint-enable functional/no-expression-statement */
/* eslint-enable functional/no-this-expression */

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

export type EncodedMessage = t.OutputOf<typeof Message>;

/**
 * Handlers return messages to be published, along with a (possibly updated) context
 * (state). Handlers are always called with the latest context (state) for a particular
 * service or component.
 */
export type HandlerResult = {
  readonly context: unknown;
  readonly messages: readonly EncodedMessage[];
};

/**
 * Message handlers are provided with a message context (state) as well as the message
 * itself.
 */
export type MessageHandler = (context: unknown, message: EncodedMessage) => Either<ContractViolation, HandlerResult>;

/**
 * Every service/component that registers with the message bus has a single context
 * entry that stores the context as well as the handlers associated with that service
 * or component.
 */
export type ContextEntry = {
  readonly context: unknown;
  readonly handlers: readonly MessageHandler[];
};

export type RegisteredHandlerContexts = readonly ContextEntry[];
export type HandlerContextRegistry = BehaviorSubject<RegisteredHandlerContexts>;

/**
 * The medium over which messages are published.
 */
export type MessageChannel = Subject<Message>;

type Dependencies = {
  readonly contractViolationHandler: ContractViolationHandler;
};

/**
 * Message Bus State
 */
type State = {
  readonly messageChannel: MessageChannel;
  readonly messageRegistry: MessageTypeRegistry;
  readonly handlerContextRegistry: HandlerContextRegistry;
};

/**
 * Combines the configuration (dependencies) with the current state
 */
export type MessageBus = {
  readonly dependencies: Dependencies;
  readonly state: State;
};

// eslint-disable-next-line functional/no-return-void
export type ContractViolationHandler = (violation: ContractViolation) => void;

//
// MessageBus Lenses
//
export const MessageRegistry = Lens.fromPath<MessageBus>()(['state', 'messageRegistry', 'value']);
export const HandlerContextRegistry = Lens.fromPath<MessageBus>()(['state', 'handlerContextRegistry', 'value']);
