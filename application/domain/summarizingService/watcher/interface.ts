import { Event, EventHandler, EventName, ContractViolation } from '../../../framework/eventBus';
import { Either, left } from 'fp-ts/lib/Either';
import * as it from './interfaceTypes';
import * as dt from './domainTypes';

//
// Command Handlers
//

export const startFileWatchHandler: EventHandler = (event: Event): Either<ContractViolation, readonly Event[]> => {
  return left(new it.WatcherContractViolation('Start file watcher command not implemented'));
};

export const stopFileWatchHandler: EventHandler = (event: Event): Either<ContractViolation, readonly Event[]> => {
  return left(new it.WatcherContractViolation('Stop file watcher command not implemented'));
};

//
// Interface Functions
//

/**
 * Get the event handlers for all of the events that are subscribed to by this service.
 */
export const getEventHandlers = (eventName: EventName): readonly EventHandler[] => {
  const eventHandlers: Record<string, readonly EventHandler[]> = {
    'Watcher.START_FILE_WATCH': [startFileWatchHandler],
    'Watcher.STOP_FILE_WATCH': [stopFileWatchHandler],
  };
  return eventHandlers[eventName] || [];
};

/**
 * Get the names of all the events that are published by this service
 */
// eslint-disable-next-line functional/functional-parameters
export const getEventNames = (): readonly EventName[] => {
  return dt.Events.map(localName => dt.ServiceName + '.' + localName);
};

/**
 * Initialize service dependencies
 */
export const initializeService = (dependencies: it.Dependencies): it.Service => {
  // eslint-disable-next-line functional/no-expression-statement
  dt.Service.next({
    dependencies: dependencies,
  });
  return dt.Service;
};
