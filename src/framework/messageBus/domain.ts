import { Subject, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PathReporter } from 'io-ts/lib/PathReporter';
import * as Either from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import * as dt from './domainTypes';
import * as it from './interfaceTypes';

/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-throw-statement */

export const initializeMessageBus = (contractViolationHandler: dt.ContractViolationHandler): dt.MessageBus => {
  return {
    dependencies: {
      contractViolationHandler: contractViolationHandler,
    },
    state: {
      messageChannel: new Subject(),
      messageRegistry: new BehaviorSubject<dt.RegisteredMessageTypes>([]),
      handlerContextRegistry: new BehaviorSubject<dt.RegisteredHandlerContexts>([]),
    },
  };
};

export const errorsToContractViolation = (componentName: string, validationErrors: t.Errors): dt.ContractViolation => {
  const message = PathReporter.report(Either.left(validationErrors)).reduce((acc, cur) => acc + '\n' + cur, '');
  return new dt.ContractViolation(componentName, message);
};

const isRegisteredMessageType = (messageBus: dt.MessageBus, name: dt.MessageType): boolean => {
  return messageBus.state.messageRegistry.value.includes(name);
};

const reportPublishUnregisteredViolation = (messageBus: dt.MessageBus, messageType: dt.MessageType): void => {
  messageBus.dependencies.contractViolationHandler(
    new dt.ContractViolation(dt.MessageBusServiceName, `Unable to publish unregistered message type ${messageType}`),
  );
};

const publishDomainMessage = (messageBus: dt.MessageBus) => (message: dt.Message): void => {
  return isRegisteredMessageType(messageBus, message.messageType)
    ? messageBus.state.messageChannel.next(message)
    : reportPublishUnregisteredViolation(messageBus, message.messageType);
};

/**
 * Returns a function that returns true if the supplied context entry includes the handler.
 */
const isHandlerContextEntry = (handler: it.MessageHandler) => (contextEntry: dt.ContextEntry): boolean => {
  return contextEntry.handlers.includes(handler) ? true : false;
};

const findHandlerContextEntry = (
  messageBus: dt.MessageBus,
  handler: it.MessageHandler,
): dt.ContextEntry | undefined => {
  return dt.HandlerContextRegistry.get(messageBus).find(isHandlerContextEntry(handler));
};

const getHandlerContext = (messageBus: dt.MessageBus, handler: it.MessageHandler): unknown => {
  const contextEntry = findHandlerContextEntry(messageBus, handler);
  return contextEntry?.context;
};

const setHandlerContext = (messageBus: dt.MessageBus, handler: it.MessageHandler, context: unknown): void => {
  const updatedContextRegistry = dt.HandlerContextRegistry.get(messageBus).map(contextEntry =>
    isHandlerContextEntry(handler)(contextEntry) ? { ...contextEntry, context: context } : contextEntry,
  );
  dt.HandlerContextRegistry.set(updatedContextRegistry)(messageBus);
};

const handleMessage = (messageBus: dt.MessageBus, handlers: readonly it.MessageHandler[]) => (
  message: dt.Message,
): readonly it.Message[] => {
  const encodedMessage = dt.Message.encode(message);

  const messages: readonly it.Message[] = handlers.flatMap(handler => {
    const context = getHandlerContext(messageBus, handler);
    return Either.fold(
      (violation: dt.ContractViolation) => {
        messageBus.dependencies.contractViolationHandler(violation);
        return [];
      },
      (result: dt.HandlerResult) => {
        setHandlerContext(messageBus, handler, result.context);
        return result.messages;
      },
    )(handler(context, encodedMessage));
  });
  return messages;
};

const reportValidationErrors = (messageBus: dt.MessageBus, errors: t.Errors): void => {
  messageBus.dependencies.contractViolationHandler(errorsToContractViolation(dt.MessageBusServiceName, errors));
};

const reportAlreadyRegisteredViolation = (messageBus: dt.MessageBus, messageType: dt.MessageType): void => {
  messageBus.dependencies.contractViolationHandler(
    new dt.ContractViolation(dt.MessageBusServiceName, `Unable to register duplicate message type ${messageType}`),
  );
};

export const registerMessageTypes = (messageBus: it.MessageBus, messageTypes: readonly it.MessageType[]): void => {
  const validatedMessageTypes = messageTypes.map(name => dt.MessageType.decode(name));

  validatedMessageTypes.map((errorsOrType: Either.Either<t.Errors, dt.MessageType>) =>
    Either.fold(
      (errors: t.Errors) => reportValidationErrors(messageBus, errors),
      (messageType: dt.MessageType) =>
        messageBus.state.messageRegistry.value.includes(messageType)
          ? reportAlreadyRegisteredViolation(messageBus, messageType)
          : messageBus.state.messageRegistry.next([...messageBus.state.messageRegistry.value, messageType]),
    )(errorsOrType),
  );
};

export const registerMessageType = (messageBus: it.MessageBus, messageType: it.MessageType): void => {
  registerMessageTypes(messageBus, [messageType]);
};

export const getRegisteredMessageTypes = (messageBus: it.MessageBus): readonly it.MessageType[] => {
  return messageBus.state.messageRegistry.getValue().map(registeredType => dt.MessageType.encode(registeredType));
};

export const publishMessages = (messageBus: it.MessageBus, messagesToPublish: readonly it.Message[]): void => {
  messagesToPublish.map(message => {
    Either.fold(
      (errors: t.Errors) =>
        messageBus.dependencies.contractViolationHandler(errorsToContractViolation(dt.MessageBusServiceName, errors)),
      (message: dt.Message) => publishDomainMessage(messageBus)(message),
    )(dt.Message.decode(message));
  });
};

export const publishMessage = (messageBus: it.MessageBus, message: it.Message): void => {
  publishMessages(messageBus, [message]);
};

const reportSubscribeUnregisteredViolation = (messageBus: dt.MessageBus, messageType: dt.MessageType): void => {
  messageBus.dependencies.contractViolationHandler(
    new dt.ContractViolation(
      dt.MessageBusServiceName,
      `Unable to subscribe to unregistered message type ${messageType}`,
    ),
  );
};

const handleDomainMessageAndPublishResults = (messageBus: dt.MessageBus, handlers: readonly it.MessageHandler[]) => (
  message: dt.Message,
): void => {
  const messagesToPublish = handleMessage(messageBus, handlers)(message);
  publishMessages(messageBus, messagesToPublish);
};

const subscribeHandlersToFilteredMessageChannel = (
  messageBus: dt.MessageBus,
  messageType: dt.MessageType,
  handlers: readonly it.MessageHandler[],
): void => {
  messageBus.state.messageChannel
    .pipe(filter((message: dt.Message) => message.messageType === messageType))
    .subscribe(handleDomainMessageAndPublishResults(messageBus, handlers));
};

const subscribeHandlers = (messageBus: it.MessageBus) => (messageType: it.MessageType) => (
  handlers: readonly it.MessageHandler[],
): void => {
  Either.fold(
    (errors: t.Errors) => reportValidationErrors(messageBus, errors),
    (messageType: dt.MessageType) => {
      return isRegisteredMessageType(messageBus, messageType)
        ? subscribeHandlersToFilteredMessageChannel(messageBus, messageType, handlers)
        : reportSubscribeUnregisteredViolation(messageBus, messageType);
    },
  )(dt.MessageType.decode(messageType));
};

export const subscribeHandlersToMessageType = (
  messageBus: it.MessageBus,
  messageType: it.MessageType,
  handlers: readonly it.MessageHandler[],
): void => {
  subscribeHandlers(messageBus)(messageType)(handlers);
};

export const subscribeHandlerToMessageType = (
  messageBus: it.MessageBus,
  messageType: it.MessageType,
  handler: it.MessageHandler,
): void => {
  subscribeHandlersToMessageType(messageBus, messageType, [handler]);
};
