import { Event, EventHandler, ContractViolation } from '../../framework/eventBus';
import { Either, left } from 'fp-ts/lib/Either';

//
// Handlers
//
export const fileWatchStartedHandler: EventHandler = (event: Event): Either<ContractViolation, readonly Event[]> => {
  return left(new ContractViolation('FeatureTreeDataProvider', 'fileWatchStartedHandler not implemented'));
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
