import { ServiceName, Events } from './events';
import { EventHandler, EventName, EventRegistrationInfoDto } from '../../../framework/eventBus';

import * as handlers from './handlers';

// eslint-disable-next-line functional/functional-parameters
export const getEventRegistrationInfo = (): EventRegistrationInfoDto => {
  return { serviceName: ServiceName, localEventNames: Events };
};

export const getHandlersFromEventName = (eventName: EventName): readonly EventHandler[] => {
  const eventHandlers: Record<string, readonly EventHandler[]> = {
    'Watcher.START_FILE_WATCH': [handlers.startFileWatchHandler],
    'Watcher.STOP_FILE_WATCH': [handlers.stopFileWatchHandler],
  };
  return eventHandlers[EventName.encode(eventName)] || [];
};
