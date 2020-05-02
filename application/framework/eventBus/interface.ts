import * as t from 'io-ts';
import * as it from './interfaceTypes';
import * as d from './domain';

/* eslint-disable functional/no-return-void */

/**
 * Creates a new event bus.
 *
 * @param contractViolationHandler is the function that will be called when a contract violation error is
 * returned by an event handler, or when the event bus itself detects a contract violation.
 */
export type createEventBus = (contractViolationHandler: it.ContractViolationHandler) => it.EventBus;
export const createEventBus = d.createEventBus;

/**
 * Registers the named events with an event bus.
 *
 * Any invalid event names will not be registered and will cause the event bus error handler to be called.
 */
export type registerEvents = (eventBus: it.EventBus, eventNames: readonly it.EventName[]) => void;
export const registerEvents = d.registerEvents;

/**
 * Gets the list of event names that have been registered with the event bus
 */
export type getRegisteredEvents = (eventBus: it.EventBus) => readonly it.EventName[];
export const getRegisteredEvents = d.getRegisteredEvents;

/**
 * Subscribes a list of event handlers to an event.
 */
export type subscribeToEvent = (
  eventBus: it.EventBus,
) => (eventName: it.EventName, handlers: readonly it.EventHandler[]) => void;
export const subscribeToEvent = d.subscribeToEvent;

/**
 * Converts type validation errors into a contract violation error.
 *
 * @param componentName - the name of the component that is reporting the contract violation error
 * @param validationErrors - an array of type validation errors to include in the ContractViolation message.
 */
export type errorsToContractViolation = (componentName: string, validationErrors: t.Errors) => it.ContractViolation;
export const errorsToContractViolation = d.errorsToContractViolation;
