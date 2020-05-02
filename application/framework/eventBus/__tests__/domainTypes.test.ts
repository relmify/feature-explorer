import { Event, LocalEventName, ServiceName, EventName, EventData } from '../domainTypes';

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

describe('LocalEventName.is()', () => {
  test('should be true for a well-formatted event name', () => {
    expect(LocalEventName.is('GOOD_NAME')).toBe(true);
  });
  test('should be false for an event name that contains a lower case letter', () => {
    expect(LocalEventName.is('BaD_NAME')).toBe(false);
  });
});

describe('EventName.is()', () => {
  test('should be true for a correctly formatted event name', () => {
    expect(EventName.is('My.GOOD_NAME')).toBe(true);
  });
});

describe('EventData.is()', () => {
  test('should be true for arbitrary unknown data', () => {
    expect(EventData.is('some data')).toBe(true);
  });
  test('should be true for undefined data', () => {
    expect(EventData.is(undefined)).toBe(true);
  });
});

describe('EventData.is()', () => {
  test('should be true for arbitrary unknown data', () => {
    expect(EventData.is('some data')).toBe(true);
  });
  test('should be true for undefined data', () => {
    expect(EventData.is(undefined)).toBe(true);
  });
});

describe('Event.is()', () => {
  test('should be true if the event has a valid name and data', () => {
    expect(Event.is({ name: 'S.EVENT', data: '' })).toBe(true);
  });
  test('should be true if the data value is undefined', () => {
    expect(Event.is({ name: 'S.EVENT', data: undefined })).toBe(true);
  });
  test('should be false if a data property is not provided', () => {
    expect(Event.is({ name: 'S.EVENT' })).toBe(false);
  });
  test('should be false if name is an empty string', () => {
    expect(Event.is({ name: '', data: '' })).toBe(false);
  });
  test('should be false if name is not a string', () => {
    expect(Event.is({ name: ['S.EVENT'], data: '' })).toBe(false);
  });
  test('should be false if the name value is undefined', () => {
    expect(Event.is({ name: undefined, data: 'event data' })).toBe(false);
  });
  test('should be false if a name property is not provided', () => {
    expect(Event.is({ data: 'event data' })).toBe(false);
  });
});
