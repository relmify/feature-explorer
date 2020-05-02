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
 * Creates a new event bus.
 *
 * @param contractViolationHandler is the function that will be called when a contract violation error is
 * returned by an event handler, or when the event bus itself detects a contract violation.
 */
export type createEventBus = (contractViolationHandler: it.ContractViolationHandler) => it.EventBus;
export const createEventBus = d.createEventBus;

/**
 * Registers the named event with an event bus.
 *
 * An invalid event name will not be registered and will cause the event bus error handler to be called.
 */
export type registerEventName = (eventBus: it.EventBus, eventName: it.EventName) => void;
export const registerEventName = d.registerEventName;

/**
 * Registers a list of named events with an event bus.
 *
 * Invalid event names will not be registered and will cause the event bus error handler to be called.
 */
export type registerEventNames = (eventBus: it.EventBus, eventNames: readonly it.EventName[]) => void;
export const registerEventNames = d.registerEventNames;

/**
 * Gets the list of event names that have been registered with the event bus
 */
export type getRegisteredEventNames = (eventBus: it.EventBus) => readonly it.EventName[];
export const getRegisteredEventNames = d.getRegisteredEventNames;

/**
 * Subscribes a handler to a named event.
 */
export type subscribeHandlerToEventName = (
  eventBus: it.EventBus,
  eventName: it.EventName,
  handler: it.EventHandler,
) => void;
export const subscribeHandlerToEventName = d.subscribeHandlerToEventName;

/**
 * Subscribes a list of handlers to a named event.
 */
export type subscribeHandlersToEventName = (
  eventBus: it.EventBus,
  eventName: it.EventName,
  handlers: readonly it.EventHandler[],
) => void;
export const subscribeHandlersToEventName = d.subscribeHandlersToEventName;

/**
 * Publishes an event.
 */
export type publishEvent = (eventBus: it.EventBus, event: it.Event) => void;
export const publishEvent = d.publishEvent;

/**
 * Publish multiple events.
 */
export type publishEvents = (eventBus: it.EventBus, events: readonly it.Event[]) => void;
export const publishEvents = d.publishEvents;
