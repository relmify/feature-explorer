import { Event, EventName, EventHandler, ContractViolation } from '../../framework/eventBus';
import { Either, left, isRight } from 'fp-ts/lib/Either';
import * as dt from './domainTypes';
import * as it from './interfaceTypes';

//
// External Event Handlers
//
export const fileWatchStartedHandler: EventHandler = (event: Event): Either<ContractViolation, readonly Event[]> => {
  return left(new ContractViolation('FeatureTreeDataProvider', 'fileWatchStartedHandler not implemented'));
};

//
// Interface Functions
//
/**
 * Custom type guard that returns true if the item is a file item
 */
export const isFileItem = (item: it.Item): item is it.FileItem => {
  return isRight(dt.FileItem.decode(item)) ? true : false;
};

/**
 * Custom type guard that returns true if the item is a file content item
 */
export const isFileContentItem = (item: it.Item): item is it.FileContentItem => {
  return isRight(dt.FileContentItem.decode(item)) ? true : false;
};

/**
 * Get the event handlers for all of the events that are subscribed to by this service.
 */
export const getEventHandlers = (eventName: EventName): readonly EventHandler[] => {
  const eventHandlers: Record<string, readonly EventHandler[]> = {
    'Watcher.FILE_WATCH_STARTED': [fileWatchStartedHandler],
  };
  return eventHandlers[eventName] || [];
};

/**
 * Get the names of all the events that are published by this service
 */
// eslint-disable-next-line functional/functional-parameters
export const getEventNames = (): readonly EventName[] => {
  return it.Events.map(localName => it.ServiceName + '.' + localName);
};

/**
 * Initialize service dependencies.
 */
export const initializeService = (dependencies: it.Dependencies): it.Service => {
  // eslint-disable-next-line functional/no-expression-statement
  dt.Service.next({
    dependencies: dependencies,
  });
  return dt.Service;
};
