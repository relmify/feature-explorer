import { Message, MessageHandler, MessageType, ContractViolation } from '../../framework/messageBus';
import { Either, left } from 'fp-ts/lib/Either';
import * as dt from './domainTypes';
import * as it from './interfaceTypes';

//
// Command Handlers
//

export const parseFileHandler: MessageHandler = (message: Message): Either<ContractViolation, readonly Message[]> => {
  return left(new it.ParserContractViolation('Parse file command not implemented'));
};

//
// Interface Functions
//

/**
 * Get the message handlers for all of the message types that are subscribed to by this service.
 */
export const getMessageHandlers = (messageType: MessageType): readonly MessageHandler[] => {
  const messageHandlers: Record<string, readonly MessageHandler[]> = {
    'Parser.PARSE_FILE': [parseFileHandler],
  };
  return messageHandlers[messageType] || [];
};

/**
 * Get the names of all the message types that are published by this service
 */
// eslint-disable-next-line functional/functional-parameters
export const getMessageTypes = (): readonly MessageType[] => {
  return it.Messages.map(localName => it.ServiceName + '.' + localName);
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
