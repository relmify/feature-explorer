import { ValidEvent, ValidEventData } from '../types';

describe('ValidEventData.is()', () => {
  test('should be true for arbitrary unknown data', () => {
    expect(ValidEventData.is('some data')).toBe(true);
  });
  test('should be true for undefined data', () => {
    expect(ValidEventData.is(undefined)).toBe(true);
  });
});

describe('ValidEvent.is()', () => {
  test('should be true if the event has a name and data', () => {
    expect(ValidEvent.is({ name: 'my event', data: '' })).toBe(true);
  });
  test('should be true if the data value is undefined', () => {
    expect(ValidEvent.is({ name: 'my event', data: undefined })).toBe(true);
  });
  test('should be false if a data property is not provided', () => {
    expect(ValidEvent.is({ name: 'my event' })).toBe(false);
  });
  test('should be false if name is an empty string', () => {
    expect(ValidEvent.is({ name: '', data: '' })).toBe(false);
  });
  test('should be false if name is not a string', () => {
    expect(ValidEvent.is({ name: ['array with string'], data: '' })).toBe(false);
  });
  test('should be false if the name value is undefined', () => {
    expect(ValidEvent.is({ name: undefined, data: 'event data' })).toBe(false);
  });
  test('should be false if a name property is not provided', () => {
    expect(ValidEvent.is({ data: 'event data' })).toBe(false);
  });
});
