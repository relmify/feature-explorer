import * as dt from './domainTypes';
import * as it from './interfaceTypes';
import * as mb from '../messageBus';
import * as watcher from '../../domain/watcher';

/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-conditional-statement */

//
// Initialize Framework
//

export const contractViolationHandler: mb.ContractViolationHandler = (error: Error) => {
  console.log(error.message);
};

export const initializeFramework = (contractViolationHandler: mb.ContractViolationHandler): it.Framework => {
  return {
    messageBus: mb.initializeMessageBus(contractViolationHandler),
  };
};

//
// Initialize Domain
//

export const initializeDomain = (framework: it.Framework): it.Domain => {
  return {
    watcher: watcher.initializeWatcher(framework.messageBus),
  };
};

//
// Configure Framework
//

export const messagesConfiguration: dt.MessagesConfiguration = {
  allMessageTypes: [...watcher.getMessageTypes()],
  allGetMessageHandlersFunctions: [watcher.getMessageHandlers],
};

const subscribeToMessages = (messageBus: mb.MessageBus, configuration: dt.MessagesConfiguration): void => {
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

const configureMessageBus = (messageBus: mb.MessageBus, configuration: dt.MessagesConfiguration): it.Framework => {
  mb.registerMessageTypes(messageBus, configuration.allMessageTypes);
  subscribeToMessages(messageBus, configuration);
  return { messageBus: messageBus };
};

export const configureFramework = (
  framework: it.Framework,
  messagesConfiguration: dt.MessagesConfiguration,
): it.Framework => {
  return {
    messageBus: configureMessageBus(framework.messageBus, messagesConfiguration),
    ...framework,
  };
};

//
// Configure Domain
//
export const configureDomain = (domain: it.Domain): it.Domain => {
  return domain;
};
