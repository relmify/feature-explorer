import { Message, MessageHandler, MessageType, ContractViolation, HandlerResult } from '../../framework/messageBus';
import { Either, left } from 'fp-ts/lib/Either';
import * as it from './interfaceTypes';
import * as d from './domain';

//
// Command Handlers
//

export const startFileWatchHandler: MessageHandler = (
  context: unknown,
  message: Message,
): Either<ContractViolation, HandlerResult> => {
  return left(new it.WatcherContractViolation('Start file watcher command not implemented'));
};

export const stopFileWatchHandler: MessageHandler = (
  context: unknown,
  message: Message,
): Either<ContractViolation, HandlerResult> => {
  return left(new it.WatcherContractViolation('Stop file watcher command not implemented'));
};

//
// Interface Functions
//

/**
 * Initialize Watcher
 */
export const initializeWatcher = d.initializeWatcher;

/**
 * Get the message handlers for all of the messages that are subscribed to by this service.
 */
export const getMessageHandlers = (messageType: MessageType): readonly MessageHandler[] => {
  const messageHandlers: Record<string, readonly MessageHandler[]> = {
    'Watcher.START_FILE_WATCH': [startFileWatchHandler],
    'Watcher.STOP_FILE_WATCH': [stopFileWatchHandler],
  };
  return messageHandlers[messageType] || [];
};

/**
 * Get the message type names of all the messages that are published by this service
 */
// eslint-disable-next-line functional/functional-parameters
export const getMessageTypes = (): readonly MessageType[] => {
  return it.Messages.map(localName => it.ServiceName + '.' + localName);
};
