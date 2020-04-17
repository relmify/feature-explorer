import { EventBus, EventName } from '../types';
import { registerEvents, isRegisteredEvent, createEventBus } from '../index';

let eventBus: EventBus;
beforeEach(() => {
  eventBus = createEventBus();
});

describe('registerEvents()', () => {
  test('should successfully register a new valid event name', () => {
    const eventName = 'MyService.EVENT' as EventName;
    registerEvents(eventBus, [eventName]);
    expect(isRegisteredEvent(eventBus, eventName)).toBe(true);
  });
});
describe('isRegisteredEvent()', () => {
  test('should return true if the event name is registered', () => {
    const eventName = 'MyService.EVENT' as EventName;
    registerEvents(eventBus, [eventName]);
    expect(isRegisteredEvent(eventBus, eventName)).toBe(true);
  });
  test('should return false if the event name is not registered', () => {
    expect(isRegisteredEvent(eventBus, 'MyService.NOT_REGISTERED' as EventName)).toBe(false);
  });
});

describe('createEventBus()', () => {
  test('should return an event bus with an event Registry', () => {
    const eventBus = createEventBus();
    expect(eventBus.subject).not.toEqual(undefined);
    expect(eventBus.registry).not.toEqual(undefined);
  });
});

describe('publishEvent()', () => {
  test.todo('should ');
});

describe('handleEvent()', () => {
  test.todo('should ');
});
