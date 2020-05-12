import { Message, MessageBus, ContractViolationHandler, MessageHandler } from '../interfaceTypes';
import * as t from 'io-ts';
import { right, isLeft } from 'fp-ts/lib/Either';
import {
  createMessageBus,
  registerMessageType,
  registerMessageTypes,
  getRegisteredMessageTypes,
  subscribeHandlerToMessageType,
  subscribeHandlersToMessageType,
  publishMessage,
  publishMessages,
  errorsToContractViolation,
} from '../interface';

let messageBus: MessageBus;
let contractViolationHandler: ContractViolationHandler;

describe('createMessageBus()', () => {
  test('should return a message bus with a message channel and a message registry', () => {
    const contractViolationHandler: ContractViolationHandler = jest.fn();
    const messageBus = createMessageBus(contractViolationHandler);
    expect(messageBus.messageChannel).not.toEqual(undefined);
    expect(messageBus.registry).not.toEqual(undefined);
  });
});

describe('registerMessageType()', () => {
  const messageType = 'MyService.EVENT';

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    messageBus = createMessageBus(contractViolationHandler);
  });

  test('should successfully register a new valid message type', () => {
    registerMessageType(messageBus, messageType);
    expect(contractViolationHandler).not.toHaveBeenCalled();
    expect(getRegisteredMessageTypes(messageBus)).toContain(messageType);
  });

  test('should not allow you to register an empty message type name', () => {
    const emptyMessageTypeName = '';
    registerMessageType(messageBus, emptyMessageTypeName);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
    expect(getRegisteredMessageTypes(messageBus)).not.toContain(emptyMessageTypeName);
  });

  test('should not allow you to register an invalid message type name', () => {
    const invalidMessageTypeName = 'InavlidName';
    registerMessageType(messageBus, invalidMessageTypeName);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
    expect(getRegisteredMessageTypes(messageBus)).not.toContain(invalidMessageTypeName);
  });

  test('should not allow you to register the same message type twice', () => {
    registerMessageType(messageBus, messageType);
    registerMessageType(messageBus, messageType);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });
});

describe('RegisterMessageTypes()', () => {
  const oneMessageType = 'MyService.ONE_EVENT';
  const anotherMessageType = 'MyService.ANOTHER_EVENT';

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    messageBus = createMessageBus(contractViolationHandler);
  });

  test('should successfully register multiple message types', () => {
    registerMessageTypes(messageBus, [oneMessageType, anotherMessageType]);
    expect(contractViolationHandler).not.toHaveBeenCalled();
    expect(getRegisteredMessageTypes(messageBus)).toEqual([oneMessageType, anotherMessageType]);
  });

  test('should not report an error when an empty list is supplied', () => {
    registerMessageTypes(messageBus, []);
    expect(contractViolationHandler).not.toHaveBeenCalled();
    expect(getRegisteredMessageTypes(messageBus)).toEqual([]);
  });

  test('should register all valid message type names and report an error for each invalid name', () => {
    registerMessageTypes(messageBus, [oneMessageType, 'Bad name', anotherMessageType, 'Another bad name']);
    expect(contractViolationHandler).toHaveBeenCalledTimes(2);
    expect(getRegisteredMessageTypes(messageBus)).toEqual([oneMessageType, anotherMessageType]);
  });
});

describe('getRegisteredMessageTypes()', () => {
  const oneMessageType = 'MyService.ONE_EVENT';
  const anotherMessageType = 'MyService.ANOTHER_EVENT';
  let messageBus: MessageBus;
  let contractViolationHandler: ContractViolationHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    messageBus = createMessageBus(contractViolationHandler);
  });

  test('should return an empty list when no message types are registered', () => {
    expect(getRegisteredMessageTypes(messageBus)).toEqual([]);
  });

  test('should return list with one item when one message type is registered', () => {
    registerMessageType(messageBus, oneMessageType);
    expect(getRegisteredMessageTypes(messageBus)).toEqual([oneMessageType]);
  });

  test('should return the full list of message types when multiple message types are registered', () => {
    registerMessageTypes(messageBus, [oneMessageType, anotherMessageType]);
    expect(getRegisteredMessageTypes(messageBus)).toEqual([oneMessageType, anotherMessageType]);
  });
});

describe('subscribeHandlerToMessageType()', () => {
  const messageType = 'MyService.EVENT';
  const anothermessageType = 'MyService.ANOTHER_EVENT';

  let messageHandler: MessageHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    messageHandler = jest.fn();
    messageBus = createMessageBus(contractViolationHandler);
    registerMessageType(messageBus, messageType);
  });

  test('should successfully subscribe a handler to a registered message type', () => {
    subscribeHandlerToMessageType(messageBus, messageType, messageHandler);
    expect(contractViolationHandler).not.toHaveBeenCalled();
  });

  test('should fail to subscribe a handler to an invalid message type name', () => {
    subscribeHandlerToMessageType(messageBus, 'Bad name', messageHandler);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });

  test('should fail to subscribe a handler to an un-registered message type name', () => {
    subscribeHandlerToMessageType(messageBus, anothermessageType, messageHandler);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });
});

describe('subscribeHandlersToMessageType()', () => {
  const oneMessageType = 'MyService.EVENT';
  const anotherMessageType = 'MyService.ANOTHER_EVENT';

  let messageHandlerOne: MessageHandler;
  let messageHandlerTwo: MessageHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    messageHandlerOne = jest.fn();
    messageHandlerTwo = jest.fn();
    messageBus = createMessageBus(contractViolationHandler);
  });

  test('should successfully subscribe handlers to a registered message type', () => {
    registerMessageType(messageBus, oneMessageType);
    subscribeHandlersToMessageType(messageBus, oneMessageType, [messageHandlerOne, messageHandlerTwo]);
    expect(contractViolationHandler).not.toHaveBeenCalled();
  });

  test('should fail to subscribe handlers to an invalid message type name', () => {
    registerMessageType(messageBus, oneMessageType);
    subscribeHandlersToMessageType(messageBus, 'Bad name', [messageHandlerOne, messageHandlerTwo]);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });

  test('should fail to subscribe handlers to an un-registered message type name', () => {
    registerMessageType(messageBus, oneMessageType);
    subscribeHandlersToMessageType(messageBus, anotherMessageType, [messageHandlerOne, messageHandlerTwo]);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });
});

describe('publishMessage()', () => {
  const messageType = 'MyService.EVENT';
  const message: Message = { messageType: messageType, data: 'data' };

  let messageHandlerOne: MessageHandler;
  let messageHandlerTwo: MessageHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    messageHandlerOne = jest.fn(() => right([]));
    messageHandlerTwo = jest.fn(() => right([]));
    messageBus = createMessageBus(contractViolationHandler);
  });

  test('should successfully publish to a single subscriber', () => {
    registerMessageType(messageBus, messageType);
    subscribeHandlerToMessageType(messageBus, messageType, messageHandlerOne);
    publishMessage(messageBus, message);
    expect(messageHandlerOne).toHaveBeenCalledWith({ messageType: messageType, data: 'data' });
    expect(messageHandlerOne).toHaveBeenCalledTimes(1);
  });

  test('should successfully publish to multiple subscribers', () => {
    registerMessageType(messageBus, messageType);
    subscribeHandlersToMessageType(messageBus, messageType, [messageHandlerOne, messageHandlerTwo]);
    publishMessage(messageBus, message);
    expect(messageHandlerOne).toHaveBeenCalledWith({ messageType: messageType, data: 'data' });
    expect(messageHandlerOne).toHaveBeenCalledTimes(1);
    expect(messageHandlerTwo).toHaveBeenCalledWith({ messageType: messageType, data: 'data' });
    expect(messageHandlerTwo).toHaveBeenCalledTimes(1);
  });

  test('should report a contract violation if the message type name in the message is invalid', () => {
    const message: Message = { messageType: 'Invalid', data: 'data' };
    publishMessage(messageBus, message);
    expect(contractViolationHandler).toHaveBeenCalled();
  });

  test('should report a contract violation if the message type name is unregistered', () => {
    const message: Message = { messageType: 'MyService.EVENT', data: 'data' };
    publishMessage(messageBus, message);
    expect(contractViolationHandler).toHaveBeenCalled();
  });
});

describe('publishMessages()', () => {
  const messageType = 'MyService.EVENT';
  const oneMessageType = 'MyService.ONE_EVENT';
  const anotherMessageType = 'MyService.ANOTHER_EVENT';

  const message: Message = { messageType: messageType, data: 'data' };
  const oneMessage: Message = { messageType: oneMessageType, data: 'info' };
  const anotherMessage: Message = { messageType: anotherMessageType, data: 'details' };

  let messageHandlerOne: MessageHandler;
  let messageHandlerTwo: MessageHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    messageHandlerOne = jest.fn(() => right([]));
    messageHandlerTwo = jest.fn(() => right([]));
    messageBus = createMessageBus(contractViolationHandler);
  });

  test('should successfully publish multiple messages', () => {
    registerMessageTypes(messageBus, [messageType, oneMessageType, anotherMessageType]);
    publishMessages(messageBus, [message, oneMessage, anotherMessage]);
  });

  test('should publish good messages and fail to publish invalid messages', () => {
    const badMessage: Message = { messageType: 'bad', data: 'worse' };
    const unregisteredMessage = { messageType: 'MyService.UNREGISTERED_EVENT', data: 'worse' };
    registerMessageTypes(messageBus, [messageType, oneMessageType, anotherMessageType]);
    subscribeHandlerToMessageType(messageBus, oneMessageType, messageHandlerOne);
    subscribeHandlerToMessageType(messageBus, anotherMessageType, messageHandlerTwo);
    publishMessages(messageBus, [message, badMessage, oneMessage, anotherMessage, unregisteredMessage]);
    expect(contractViolationHandler).toHaveBeenCalledTimes(2);
    expect(messageHandlerOne).toHaveBeenCalledTimes(1);
    expect(messageHandlerTwo).toHaveBeenCalledTimes(1);
  });
});

describe('errorsToContractViolation()', () => {
  const SampleType = t.type({
    num: t.number,
    str: t.string,
  });
  const result = SampleType.decode({ num: 'three', str: 3 });
  const errors: t.Errors = isLeft(result) ? result.left : [];

  test('should return a contract violation with the expected name', () => {
    expect(errorsToContractViolation('InterfaceTest', errors).name).toBe('InterfaceTest_Contract_Violation');
  });

  test('should return a contract violation with the expected message', () => {
    const message = errorsToContractViolation('InterfaceTest', errors).message;
    expect(message).toMatch(new RegExp('InterfaceTest_Contract_Violation.*', 'gm'));
    expect(message).toMatch(new RegExp('Invalid value "three".*', 'gm'));
    expect(message).toMatch(new RegExp('Invalid value 3.*', 'gm'));
  });
});
