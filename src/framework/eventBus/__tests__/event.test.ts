import { Event, EventData } from '../event';

describe('EventData.is()', () => {
  test('should be true for arbitrary unknown data', () => {
    expect(EventData.is('some data')).toBe(true);
  });
  test('should be true for undefined values', () => {
    expect(EventData.is(undefined)).toBe(true);
  });
});

describe('Event.is()', () => {
  test('should be true if the event has a name and data', () => {
    expect(Event.is({ name: 'my event', data: '' })).toBe(true);
  });
  test('should be true if the data value is undefined', () => {
    expect(Event.is({ name: 'my event', data: undefined })).toBe(true);
  });
  test('should be true if a data property is not provided', () => {
    expect(Event.is({ name: 'my event' })).toBe(true);
  });
  test('should be false if name is an empty string', () => {
    expect(Event.is({ name: '', data: '' })).toBe(false);
  });
  test('should be false if name is not a string', () => {
    expect(Event.is({ name: ['array with string'], data: '' })).toBe(false);
  });
  test('should be false if the name value is undefined', () => {
    expect(Event.is({ name: undefined, data: 'event data' })).toBe(false);
  });
  test('should be false if a name property is not provided', () => {
    expect(Event.is({ data: 'event data' })).toBe(false);
  });
});
