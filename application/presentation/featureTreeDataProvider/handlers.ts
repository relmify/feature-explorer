import { Event, EventHandler } from '../../framework/eventBus';

//
// Handlers
//
export const fileWatchStartedHandler: EventHandler = (event: Event): readonly Event[] => {
  return [];
};

//
// Interface
//
export const getHandlersFromEventName = (eventName: string): readonly EventHandler[] => {
  const eventHandlers: Record<string, readonly EventHandler[]> = {
    'Watcher.FILE_WATCH_STARTED': [fileWatchStartedHandler],
  };
  return eventHandlers[eventName as string];
};
