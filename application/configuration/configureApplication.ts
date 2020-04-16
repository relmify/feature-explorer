import { GetHandlersFunction, EventBus } from '../framework/eventBus';
import { createEventBus, subscribeToEvent, getRegisteredEventNames } from '../framework/eventBus/api';
import { getEventNames as watcherGetEventNames } from '../domain/summarizingService/watcher/api';
import { getHandlersFromEventName as watcherGetHandlers } from '../domain/summarizingService/watcher/api';

export type ApplicationConfiguration = {
  readonly eventBus: EventBus;
};

export type EventsConfiguration = {
  readonly eventNames: readonly string[];
  readonly getHandlersFromNameFunctions: readonly GetHandlersFunction[];
};

const eventsConfiguration: EventsConfiguration = {
  eventNames: [...watcherGetEventNames()],
  getHandlersFromNameFunctions: [watcherGetHandlers],
};

// eslint-disable-next-line functional/no-return-void
export const subscribeToEvents = (eventBus: EventBus, configuration: EventsConfiguration): void => {
  const registeredEventNames = getRegisteredEventNames(eventBus.registry);
  // eslint-disable-next-line functional/no-expression-statement
  registeredEventNames.map(eventName => {
    const eventHandlers = configuration.getHandlersFromNameFunctions
      .map(fromNameFunction => fromNameFunction(eventName))
      .reduce((acc, cur) => {
        return cur !== [] ? [...acc, ...cur] : acc;
      }, []);
    // eslint-disable-next-line functional/no-expression-statement
    subscribeToEvent(eventBus)(eventName, eventHandlers);
  });
};

export const configureApplication = (
  configuration: EventsConfiguration = eventsConfiguration,
): ApplicationConfiguration => {
  const eventBus = createEventBus(configuration.eventNames);
  // eslint-disable-next-line functional/no-expression-statement
  subscribeToEvents(eventBus, configuration);

  return {
    eventBus: eventBus,
  };
};
