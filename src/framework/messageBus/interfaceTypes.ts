/**
 * Message Bus public types
 * @packageDocumentation
 */
import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import * as dt from './domainTypes';

/**
 * Allows services to publish and subdscribe to messages
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

/* eslint-disable functional/no-class */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-this-expression */

/**
 * A ContractViolation is a custom error type that represents a contract violation between system components
 * such as:
 *
 * - between the user interface and a back-end service
 * - between two services
 * - between a service and a framework component
 * - between a service and an external dependency
 *
 * A ContractViolation normally indicates that a code or configuration change is required - by the supplier,
 * the consumer, or both - either to comply with the contract or to select a different implementation that
 * provides the desired contract.
 *
 * @param componentName the name of the component that detected the contract error.
 * @param message a string to display describing the contract violation.
 */
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
export type ContractViolationHandler = (violation: ContractViolation) => void;

/**
 * A Message Handler is a function that gets called when a message that you subscribe to arrives. Any messages
 * returned by a Message Handler will be published by the MessageBus.
 */
export type MessageHandler = (message: Message) => Either<ContractViolation, readonly Message[]>;

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
