import { Event, EventHandler } from '../../../framework/eventBus';

export const parseFileHandler: EventHandler = (event: Event): readonly Event[] => {
  return [];
};

export const getHandlersFromEventName = (eventName: string): readonly EventHandler[] => {
  const eventHandlers: Record<string, readonly EventHandler[]> = {
    'Parser.PARSE_FILE': [parseFileHandler],
  };
  return eventHandlers[eventName] || [];
};
