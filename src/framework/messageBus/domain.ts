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

export const errorsToContractViolation = (componentName: string, validationErrors: t.Errors): it.ContractViolation => {
  const message = PathReporter.report(Either.left(validationErrors)).reduce((acc, cur) => acc + '\n' + cur, '');
  return new it.ContractViolation(componentName, message);
};

const createMessageRegistry = (): dt.MessageTypeRegistry => {
  return new BehaviorSubject<dt.RegisteredMessageTypes>([]);
};

export const createMessageBus = (errorHandler: it.ContractViolationHandler): it.MessageBus => {
  return {
    messageChannel: new Subject(),
    registry: createMessageRegistry(),
    contractViolationHandler: errorHandler,
  };
};

const isRegisteredMessageType = (messageBus: dt.MessageBus, name: dt.MessageType): boolean => {
  return messageBus.registry.getValue().includes(name);
};

const reportPublishUnregisteredViolation = (messageBus: dt.MessageBus, messageType: dt.MessageType): void => {
  messageBus.contractViolationHandler(
    new it.ContractViolation(dt.MessageBusServiceName, `Unable to publish unregistered message type ${messageType}`),
  );
};

const publishDomainMessage = (messageBus: dt.MessageBus) => (message: dt.Message): void => {
  return isRegisteredMessageType(messageBus, message.messageType)
    ? messageBus.messageChannel.next(message)
    : reportPublishUnregisteredViolation(messageBus, message.messageType);
};

const handleMessage = (messageBus: dt.MessageBus, handlers: readonly it.MessageHandler[]) => (
  message: dt.Message,
): readonly it.Message[] => {
  return handlers.flatMap(handler =>
    Either.fold(
      (violation: it.ContractViolation) => {
        messageBus.contractViolationHandler(violation);
        return [];
      },
      (messages: readonly it.Message[]) => messages,
    )(handler(dt.Message.encode(message))),
  );
};

const reportValidationErrors = (messageBus: dt.MessageBus, errors: t.Errors): void => {
  messageBus.contractViolationHandler(errorsToContractViolation(dt.MessageBusServiceName, errors));
};

const reportAlreadyRegisteredViolation = (messageBus: dt.MessageBus, messageType: dt.MessageType): void => {
  messageBus.contractViolationHandler(
    new it.ContractViolation(dt.MessageBusServiceName, `Unable to register duplicate message type ${messageType}`),
  );
};

export const registerMessageTypes = (messageBus: it.MessageBus, messageTypes: readonly it.MessageType[]): void => {
  const validatedMessageTypes = messageTypes.map(name => dt.MessageType.decode(name));

  validatedMessageTypes.map((errorsOrType: Either.Either<t.Errors, dt.MessageType>) =>
    Either.fold(
      (errors: t.Errors) => reportValidationErrors(messageBus, errors),
      (messageType: dt.MessageType) =>
        messageBus.registry.value.includes(messageType)
          ? reportAlreadyRegisteredViolation(messageBus, messageType)
          : messageBus.registry.next([...messageBus.registry.value, messageType]),
    )(errorsOrType),
  );
};

export const registerMessageType = (messageBus: it.MessageBus, messageType: it.MessageType): void => {
  registerMessageTypes(messageBus, [messageType]);
};

export const getRegisteredMessageTypes = (messageBus: it.MessageBus): readonly it.MessageType[] => {
  return messageBus.registry.getValue().map(registeredType => dt.MessageType.encode(registeredType));
};

export const publishMessages = (messageBus: it.MessageBus, messagesToPublish: readonly it.Message[]): void => {
  messagesToPublish.map(message => {
    Either.fold(
      (errors: t.Errors) =>
        messageBus.contractViolationHandler(errorsToContractViolation(dt.MessageBusServiceName, errors)),
      (message: dt.Message) => publishDomainMessage(messageBus)(message),
    )(dt.Message.decode(message));
  });
};

export const publishMessage = (messageBus: it.MessageBus, message: it.Message): void => {
  publishMessages(messageBus, [message]);
};

const reportSubscribeUnregisteredViolation = (messageBus: dt.MessageBus, messageType: dt.MessageType): void => {
  messageBus.contractViolationHandler(
    new it.ContractViolation(
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
  messageBus.messageChannel
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
