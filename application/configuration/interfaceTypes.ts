import { GetHandlersFunction, EventBus, EventName } from '../framework/eventBus';

export type ApplicationConfiguration = {
  readonly eventBus: EventBus;
};

export type EventsConfiguration = {
  readonly eventNames: readonly EventName[];
  readonly getHandlersFromNameFunctions: readonly GetHandlersFunction[];
};
