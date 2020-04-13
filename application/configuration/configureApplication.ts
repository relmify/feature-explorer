import { createEventBus, EventBus, subscribeToEvent } from '../framework/eventBus/eventBus';
import { getRegisteredEventNames } from '../framework/eventBus/eventRegistry';
import { getWatcherEvents, getWatcherEventHandlersFromName } from '../domain/summarizingService/watcher';
import { GetHandlersFunction } from '../framework/eventBus';

export type ApplicationConfiguration = {
  readonly eventBus: EventBus;
};

export type EventsConfiguration = {
  readonly eventNames: readonly string[];
  readonly getHandlersFromNameFunctions: readonly GetHandlersFunction[];
};

const eventsConfiguration: EventsConfiguration = {
  eventNames: [...getWatcherEvents()],
  getHandlersFromNameFunctions: [getWatcherEventHandlersFromName],
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
