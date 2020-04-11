import { EventRegistry, createEventRegistry, registerEvents, isRegisteredEvent } from '../eventRegistry';

describe('isRegisteredEvent()', () => {
  let eventRegistry: EventRegistry;
  beforeEach(() => {
    eventRegistry = createEventRegistry();
  });
  test('should return true if the event name is registered', () => {
    const eventName = 'EVENT';
    const registry = registerEvents(eventRegistry, [eventName]);
    expect(isRegisteredEvent(registry, eventName)).toBe(true);
  });
  test('should return false if the event name is not registered', () => {
    expect(isRegisteredEvent(eventRegistry, 'NOT_REGISTERED')).toBe(false);
  });
  test('should return true if the event name is registered on creation', () => {
    const eventName = 'CREATE_TIME_EVENT';
    const registry = createEventRegistry([eventName]);
    expect(isRegisteredEvent(registry, eventName)).toBe(true);
  });
});
