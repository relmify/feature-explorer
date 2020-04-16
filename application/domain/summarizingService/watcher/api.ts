import { Events, ServiceName } from './events';
import { EventHandler } from '../../../framework/eventBus';
import * as handlers from './handlers';

// eslint-disable-next-line functional/functional-parameters
export const getEventNames = (): readonly string[] => {
  return Events.map(event => `${ServiceName}.${event}`);
};

export const getHandlersFromEventName = (eventName: string): readonly EventHandler[] => {
  const eventHandlers: Record<string, readonly EventHandler[]> = {
    'Watcher.START_FILE_WATCH': [handlers.startFileWatchHandler],
    'Watcher.STOP_FILE_WATCH': [handlers.stopFileWatchHandler],
  };
  return eventHandlers[eventName] || [];
};
