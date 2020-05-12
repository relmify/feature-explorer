import * as t from 'io-ts';
import * as it from './interfaceTypes';
import * as d from './domain';

/* eslint-disable functional/no-return-void */

/**
 * Utility function that converts an array type validation errors into a single contract violation error.
 *
 * @param componentName - the name of the component that is reporting the contract violation error.
 * @param validationErrors - an array of type validation errors to include in the ContractViolation message.
 */
export type errorsToContractViolation = (componentName: string, validationErrors: t.Errors) => it.ContractViolation;
export const errorsToContractViolation = d.errorsToContractViolation;

/**
 * Creates a new message bus.
 *
 * @param contractViolationHandler is the function that will be called when a contract violation error is
 * returned by a message handler, or when the message bus itself detects a contract violation.
 */
export type createMessageBus = (contractViolationHandler: it.ContractViolationHandler) => it.MessageBus;
export const createMessageBus = d.createMessageBus;

/**
 * Registers the message type with a message bus.
 *
 * An invalid message type name will not be registered and will cause the message bus error handler to be called.
 */
export type registerMessageType = (messageBus: it.MessageBus, messageType: it.MessageType) => void;
export const registerMessageType = d.registerMessageType;

/**
 * Registers a list of message types with a message bus.
 *
 * Invalid message type names will not be registered and will cause the message bus error handler to be called.
 */
export type registerMessageTypes = (messageBus: it.MessageBus, messageTypes: readonly it.MessageType[]) => void;
export const registerMessageTypes = d.registerMessageTypes;

/**
 * Gets the list of message type names that have been registered with the message bus
 */
export type getRegisteredMessageTypes = (messageBus: it.MessageBus) => readonly it.MessageType[];
export const getRegisteredMessageTypes = d.getRegisteredMessageTypes;

/**
 * Subscribes a handler to a named message type.
 */
export type subscribeHandlerToMessageType = (
  messageBus: it.MessageBus,
  messageType: it.MessageType,
  handler: it.MessageHandler,
) => void;
export const subscribeHandlerToMessageType = d.subscribeHandlerToMessageType;

/**
 * Subscribes a list of handlers to a named message type.
 */
export type subscribeHandlersToMessageType = (
  messageBus: it.MessageBus,
  messageType: it.MessageType,
  handlers: readonly it.MessageHandler[],
) => void;
export const subscribeHandlersToMessageType = d.subscribeHandlersToMessageType;

/**
 * Publishes a message.
 */
export type publishMessage = (messageBus: it.MessageBus, message: it.Message) => void;
export const publishMessage = d.publishMessage;

/**
 * Publish multiple messages.
 */
export type publishMessages = (messageBus: it.MessageBus, messages: readonly it.Message[]) => void;
export const publishMessages = d.publishMessages;
