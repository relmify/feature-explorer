import { Message, MessageType, MessageHandler, HandlerResult, ContractViolation } from '../../framework/messageBus';
import { Either, left, isRight } from 'fp-ts/lib/Either';
import * as dt from './domainTypes';
import * as it from './interfaceTypes';

//
// External Event Handlers
//
export const fileWatchStartedHandler: MessageHandler = (
  context: unknown,
  message: Message,
): Either<ContractViolation, HandlerResult> => {
  return left(new ContractViolation('Summary', 'fileWatchStartedHandler not implemented'));
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
 * Get the message types of all the messages that are published by this service
 */
// eslint-disable-next-line functional/functional-parameters
export const getMessageTypes = (): readonly MessageType[] => {
  return it.Messages.map(localName => it.ServiceName + '.' + localName);
};

/**
 * Get the message handlers for all of the message types that are subscribed to by this service.
 */
export const getMessageHandlers = (messageType: MessageType): readonly MessageHandler[] => {
  const messageHandlers: Record<string, readonly MessageHandler[]> = {
    'Watcher.FILE_WATCH_STARTED': [fileWatchStartedHandler],
  };
  return messageHandlers[messageType] || [];
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
