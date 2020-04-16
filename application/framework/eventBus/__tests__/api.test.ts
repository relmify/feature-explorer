import { EventRegistry } from '../types';
import { createEventRegistry, registerEvents, isRegisteredEvent, createEventBus } from '../api';

let eventRegistry: EventRegistry;
beforeEach(() => {
  eventRegistry = createEventRegistry();
});
describe('registerEvents()', () => {
  test('should successfully register a new valid event name', () => {
    const eventName = 'MyService.EVENT';
    const registry = registerEvents(eventRegistry, [eventName]);
    expect(isRegisteredEvent(registry, eventName)).toBe(true);
  });
  test('should thow an error if the event name is missing the service name', () => {
    const eventName = 'EVENT';
    const registry = registerEvents(eventRegistry, [eventName]);
    expect(() => isRegisteredEvent(registry, eventName)).toThrow();
  });
});
describe('isRegisteredEvent()', () => {
  test('should return true if the event name is registered', () => {
    const eventName = 'MyService.EVENT';
    const registry = registerEvents(eventRegistry, [eventName]);
    expect(isRegisteredEvent(registry, eventName)).toBe(true);
  });
  test('should return false if the event name is not registered', () => {
    expect(isRegisteredEvent(eventRegistry, 'MyService.NOT_REGISTERED')).toBe(false);
  });
  test('should return true if the event name is registered on creation', () => {
    const eventName = 'MyService.CREATE_TIME_EVENT';
    const registry = createEventRegistry([eventName]);
    expect(isRegisteredEvent(registry, eventName)).toBe(true);
  });
});

describe('createEventBus()', () => {
  test('should succeed with no parameters', () => {
    expect(createEventBus().subject).not.toEqual(undefined);
  });
  test('should register the supplied events', () => {
    expect(createEventBus(['EVENT1', 'EVENT2']).registry.getValue()).toEqual(['EVENT1', 'EVENT2']);
  });
});

describe('publishEvent()', () => {
  test.todo('should ');
});

describe('handleEvent()', () => {
  test.todo('should ');
});
