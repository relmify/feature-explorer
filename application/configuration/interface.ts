import { createEventBus, registerEvents } from '../framework/eventBus';
import { getEventRegistrationInfo as watcherGetRegistrationInfo } from '../domain/summarizingService/watcher/api';
import { getHandlersFromEventName as watcherGetHandlers } from '../domain/summarizingService/watcher/api';
import { EventsConfiguration, ApplicationConfiguration } from './types';
import { getEventNames, subscribeToEvents } from './helpers';

/* eslint-disable functional/no-expression-statement */

const eventsConfiguration: EventsConfiguration = {
  eventNames: [...getEventNames(watcherGetRegistrationInfo())],
  getHandlersFromNameFunctions: [watcherGetHandlers],
};

export const configureApplication = (
  configuration: EventsConfiguration = eventsConfiguration,
): ApplicationConfiguration => {
  const eventBus = createEventBus();
  registerEvents(eventBus, configuration.eventNames);
  subscribeToEvents(eventBus, configuration);

  return {
    eventBus: eventBus,
  };
};
