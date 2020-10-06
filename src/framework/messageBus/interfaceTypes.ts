/**
 * Message Bus public types
 * @packageDocumentation
 */

import * as t from 'io-ts';
import * as dt from './domainTypes';

/**
 * Allows services to publish and subscribe to messages
 */
export type MessageBus = dt.MessageBus;

/**
 * A message indicating that something has occurred which may be of interest to other parts of the
 * system.
 *
 * Messages typically fall into four categories:
 *
 * - **Commands** indicate that an action that will change the system state has been requested.
 * - **Queries** read the system state but do not change it.
 * - **Success Events** indicate that a change in the system state has occurred.
 * - **Failure Events** indicate that a requested change could not be made.
 */
export type Message = t.OutputOf<typeof dt.Message>;

/**
 * The system-wide message type.
 *
 * A message type is composed of two parts separated by a dot:
 *
 * - the service name
 * - the local mesasge type
 */
export type MessageType = t.OutputOf<typeof dt.MessageType>;

/**
 * Every message contains a data property which can be used to transport any data that should be passed along
 * with the message.
 */
export type MessageData = t.OutputOf<typeof dt.MessageData>;

/**
 * A new context (state) together with zero or more new messages to be published.
 */
export type HandlerResult = dt.HandlerResult;

/**
 * A Message Handler is a function that gets called when a message that you subscribe to is published.
 *
 * @param context The current state
 * @param message The message to be handled
 * @returns Either a Contract Violation or a new context together with zero or more new messages to be published.
 */
export type MessageHandler = dt.MessageHandler;

/**
 * A function that returns zero or more message handler functions for a particular message type.
 *
 * Instead of subscribing to their own messages directly, which would introduce a direct dependency on the message
 * bus, each service supplies a GetHandlers function for the top-level application to call when subscribing to messages
 * on behalf of all of the servies.
 */
export type GetHandlers = (MessageType: MessageType) => readonly MessageHandler[];

/**
 * A function that returns the names of all the message types pubished by a service.
 *
 * Instead of registering their own message types directly, which would introduce a direct dependency on the message
 * bus, each service supplies a GetMessageTypes functon for the top-level application to call when regsitering
 * messages on behalf of all of the servies.
 */
export type GetMessageTypes = () => readonly MessageType[];

/**
 * A ContractViolation error handler function that is registered during message bus creation.
 *
 * The contract violation handler is called when:
 *
 * - A message handler throws a contract violation error because it received an invalid message type or invalid
 *   message data.
 * - A message handler throws a contract violation error because it detected a contract violation in one of its
 *   dependencies.
 * - An message handler violates the message bus contract by returning one or more invalid or unregistered messages,
 *   or by throwing an error that is not a contract violation.
 */
// eslint-disable-next-line functional/no-return-void
export type ContractViolationHandler = dt.ContractViolationHandler;
