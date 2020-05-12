import { Message, LocalMessageType, ServiceName, MessageType, MessageData } from '../domainTypes';

describe('ServiceName.is()', () => {
  test('should be true for a correctly formatted service name', () => {
    expect(ServiceName.is('My.Service')).toBe(true);
  });
  test('should be true for a correctly formatted service name with numbers', () => {
    expect(ServiceName.is('My1.Service1')).toBe(true);
  });
  test('should be false for a Service name that does not start with a capital letter', () => {
    expect(ServiceName.is('my.Service')).toBe(false);
  });
  test('should be false for a Service name that starts with a number', () => {
    expect(ServiceName.is('1Bad.Service')).toBe(false);
  });
  test('should be false for a Service name that ends with a dot', () => {
    expect(ServiceName.is('My.Service.')).toBe(false);
  });
  test('should be false if a segment does not start with a captal letter', () => {
    expect(ServiceName.is('My.service.')).toBe(false);
  });
});

describe('LocalMessageType.is()', () => {
  test('should be true for a well-formatted local message type name', () => {
    expect(LocalMessageType.is('GOOD_NAME')).toBe(true);
  });
  test('should be false for a local message type name that contains a lower case letter', () => {
    expect(LocalMessageType.is('BaD_NAME')).toBe(false);
  });
});

describe('MessageType.is()', () => {
  test('should be true for a correctly formatted message type name', () => {
    expect(MessageType.is('My.GOOD_NAME')).toBe(true);
  });
});

describe('MessageData.is()', () => {
  test('should be true for arbitrary unknown data', () => {
    expect(MessageData.is('some data')).toBe(true);
  });
  test('should be true for undefined data', () => {
    expect(MessageData.is(undefined)).toBe(true);
  });
});

describe('Message.is()', () => {
  test('should be true if the message has a valid message type and data', () => {
    expect(Message.is({ messageType: 'S.EVENT', data: '' })).toBe(true);
  });
  test('should be true if the data value is undefined', () => {
    expect(Message.is({ messageType: 'S.EVENT', data: undefined })).toBe(true);
  });
  test('should be false if a data property is not provided', () => {
    expect(Message.is({ messageType: 'S.EVENT' })).toBe(false);
  });
  test('should be false if message type is an empty string', () => {
    expect(Message.is({ messageType: '', data: '' })).toBe(false);
  });
  test('should be false if message type is not a string', () => {
    expect(Message.is({ messageType: ['S.EVENT'], data: '' })).toBe(false);
  });
  test('should be false if the message type is undefined', () => {
    expect(Message.is({ messageType: undefined, data: 'event data' })).toBe(false);
  });
  test('should be false if a message type property is not provided', () => {
    expect(Message.is({ data: 'event data' })).toBe(false);
  });
});
