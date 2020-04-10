/**
 * @packageDocumentation
 * @module application
 * @internal
 */

// Application should get all the events and register them with the EventBus
// Application should also get all of the event handlers and register them
// with the event bus as subscriptions.
// The application can manage the lifetime of the subscriptions and terminate
// subscriptions as needed.

// The event bus is necessarily stateful.  It keeps track of the list
// of events and the list of subscriptions

/* eslint-disable functional/no-return-void */

/**
 * Application main entry point
 */
// export type Application = {
//   readonly start: () => void;
//   readonly stop: () => void;
//   readonly loadConfiguration: () => void;
// };

// export const createApplication: Application = (configuration: ConfigurationSelector) => {
//   const start = () => {};
//   const loadConfiguration = () => {};
//   const application: Application = {
//     start: start,
//     loadConfiguration: loadConfiguration,
//   };

//   return application;
// };
