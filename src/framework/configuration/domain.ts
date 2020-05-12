import * as dt from './domainTypes';
import * as it from './interfaceTypes';
import * as mb from '../messageBus';
import * as watcher from '../../domain/watcher';

/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-conditional-statement */

//
// Initialize Message Bus Step
//

const errorHandler: mb.ContractViolationHandler = (error: Error) => {
  console.log(error.message);
};

export const messagesConfiguration: dt.Messagesconfiguration = {
  allMessageTypes: [...watcher.getMessageTypes()],
  allGetMessageHandlersFunctions: [watcher.getMessageHandlers],
};

const subscribeToMessages = (messageBus: mb.MessageBus, configuration: dt.Messagesconfiguration): void => {
  const registeredMessageTypes = mb.getRegisteredMessageTypes(messageBus);
  registeredMessageTypes.map((messageType: mb.MessageType) => {
    const messageHandlers = configuration.allGetMessageHandlersFunctions
      .map(getHandlersFunction => getHandlersFunction(messageType))
      .reduce((acc, cur) => {
        return cur !== [] ? [...acc, ...cur] : acc;
      }, []);
    mb.subscribeHandlersToMessageType(messageBus, messageType, messageHandlers);
  });
};

export const initializeMessageBus = (configuration: dt.Messagesconfiguration): it.MessageBusConfiguration => {
  const messageBus = mb.createMessageBus(errorHandler);
  mb.registerMessageTypes(messageBus, configuration.allMessageTypes);
  subscribeToMessages(messageBus, configuration);
  return { messageBus: messageBus };
};

//
// Initialize Services Step
//

export const initializeServices = (messageBus: mb.MessageBus): it.ServicesConfiguration => {
  return {
    watcherService: watcher.initializeService({ messageBus: messageBus }),
  };
};
