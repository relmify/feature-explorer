import { Event, EventHandler } from '../../../framework/eventBus';

const startFileWatchHandler: EventHandler = (event: Event): readonly Event[] => {
  return [];
};

const stopFileWatchHandler: EventHandler = (event: Event): readonly Event[] => {
  return [];
};

export const getWatcherEventHandlersFromName = (eventName: string): readonly EventHandler[] => {
  const eventHandlers: Record<string, readonly EventHandler[]> = {
    START_FILE_WATCH: [startFileWatchHandler],
    STOP_FILE_WATCH: [stopFileWatchHandler],
  };
  return eventHandlers[eventName as string];
};
