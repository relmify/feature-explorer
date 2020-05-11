/**
 * Event Bus public types
 * @packageDocumentation
 */
import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import * as dt from './domainTypes';

/**
 * Allows services to publish and subdscribe to events
 */
export type EventBus = dt.EventBus;

/**
 * A message indicating that something has occurred which may be of intereat to other parts of the
 * system.
 *
 * Events fall into four categories:
 *
 * - **Commands** indicate that an action that will change the system state has been requested.
 * - **Queries** read the system state but do not change it.
 * - **Success Events** indicate that a change in the system state has occurred.
 * - **Failure Events** indicate that a requested change could not be made.
 */
export type Event = t.OutputOf<typeof dt.Event>;

/**
 * The system wide name for an event.
 *
 * An event name is composed of two parts separated by a dot:
 *
 * - the service name
 * - the local event name
 */
export type EventName = t.OutputOf<typeof dt.EventName>;

/**
 * Every event contains a data property which can be used to transport any data that should be passed along
 * with the event.
 */
export type EventData = t.OutputOf<typeof dt.EventData>;

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
 * A ContractViolation error handler function that is registered during event bus creation.
 *
 * The contract violation handler is called when:
 *
 * - An event handler throws a contract violation error because it received an invalid event type or invalid
 *   event data.
 * - An event handler throws a contract violation error because it detected a contract violation in one of its
 *   dependencies.
 * - An event handler violates the event bus contract by returning one or more invalid or unregistered events,
 *   or by throwing an error that is not a contract violation.
 */
// eslint-disable-next-line functional/no-return-void
export type ContractViolationHandler = (violation: ContractViolation) => void;

/**
 * An EventHandler is a function that gets called when an event that you subscribe to arrives. Any events
 * returned by an EventHandler will be published by the EventBus.
 */
export type EventHandler = (event: Event) => Either<ContractViolation, readonly Event[]>;

/**
 * A function that returns zero or more event handler functions for a particular event name.
 *
 * Instead of subscribing to their own events directly, which would introduce a direct dependency on the event
 * bus, each service supplies a GetHandlers for the top-level application to call when subscribing to events
 * on behalf of all of the servies.
 */
export type GetHandlers = (eventName: EventName) => readonly EventHandler[];

/**
 * A function that returns the names of all the events pubished by a service.
 *
 * Instead of registering their own events directly, which would introduce a direct dependency on the event
 * bus, each service supplies a GetEventNames functon for the top-level application to call when regsitering
 * events on behalf of all of the servies.
 */
export type GetEventNames = () => readonly EventName[];
