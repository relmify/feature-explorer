import { EventBus, ContractViolationHandler, EventHandler } from '../interfaceTypes';
import * as t from 'io-ts';
import { right, isLeft } from 'fp-ts/lib/Either';
import {
  createEventBus,
  registerEventName,
  registerEventNames,
  getRegisteredEventNames,
  subscribeHandlerToEventName,
  subscribeHandlersToEventName,
  publishEvent,
  publishEvents,
  errorsToContractViolation,
} from '../interface';

let eventBus: EventBus;
let contractViolationHandler: ContractViolationHandler;

describe('createEventBus()', () => {
  test('should return an event bus with an event channel and an event registry', () => {
    const contractViolationHandler: ContractViolationHandler = jest.fn();
    const eventBus = createEventBus(contractViolationHandler);
    expect(eventBus.eventChannel).not.toEqual(undefined);
    expect(eventBus.registry).not.toEqual(undefined);
  });
});

describe('registerEventName()', () => {
  const eventName = 'MyService.EVENT';

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    eventBus = createEventBus(contractViolationHandler);
  });

  test('should successfully register a new valid event name', () => {
    registerEventName(eventBus, eventName);
    expect(contractViolationHandler).not.toHaveBeenCalled();
    expect(getRegisteredEventNames(eventBus)).toContain(eventName);
  });

  test('should not allow you to register an empty event name', () => {
    const invalidEventName = '';
    registerEventName(eventBus, invalidEventName);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
    expect(getRegisteredEventNames(eventBus)).not.toContain(invalidEventName);
  });

  test('should not allow you to register an invalid event name', () => {
    const invalidEventName = 'InavlidName';
    registerEventName(eventBus, invalidEventName);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
    expect(getRegisteredEventNames(eventBus)).not.toContain(invalidEventName);
  });

  test('should not allow you to register the same event twice', () => {
    registerEventName(eventBus, eventName);
    registerEventName(eventBus, eventName);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });
});

describe('RegisterEventNames()', () => {
  const oneEventName = 'MyService.ONE_EVENT';
  const anotherEventName = 'MyService.ANOTHER_EVENT';

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    eventBus = createEventBus(contractViolationHandler);
  });

  test('should successfully register multiple names', () => {
    registerEventNames(eventBus, [oneEventName, anotherEventName]);
    expect(contractViolationHandler).not.toHaveBeenCalled();
    expect(getRegisteredEventNames(eventBus)).toEqual([oneEventName, anotherEventName]);
  });

  test('should not report an error when an empty list is supplied', () => {
    registerEventNames(eventBus, []);
    expect(contractViolationHandler).not.toHaveBeenCalled();
    expect(getRegisteredEventNames(eventBus)).toEqual([]);
  });

  test('should register all valid names and report an error for each invalid name', () => {
    registerEventNames(eventBus, [oneEventName, 'Bad name', anotherEventName, 'Another bad name']);
    expect(contractViolationHandler).toHaveBeenCalledTimes(2);
    expect(getRegisteredEventNames(eventBus)).toEqual([oneEventName, anotherEventName]);
  });
});

describe('getRegisteredEventNames()', () => {
  const oneEventName = 'MyService.ONE_EVENT';
  const anotherEventName = 'MyService.ANOTHER_EVENT';
  let eventBus: EventBus;
  let contractViolationHandler: ContractViolationHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    eventBus = createEventBus(contractViolationHandler);
  });

  test('should return an empty list when no event names are registered', () => {
    expect(getRegisteredEventNames(eventBus)).toEqual([]);
  });

  test('should return list with one item when one event name is registered', () => {
    registerEventName(eventBus, oneEventName);
    expect(getRegisteredEventNames(eventBus)).toEqual([oneEventName]);
  });

  test('should return the full list of events when multiple events are registered', () => {
    registerEventNames(eventBus, [oneEventName, anotherEventName]);
    expect(getRegisteredEventNames(eventBus)).toEqual([oneEventName, anotherEventName]);
  });
});

describe('subscribeHandlerToEventName()', () => {
  const eventName = 'MyService.EVENT';
  const anotherEventName = 'MyService.ANOTHER_EVENT';

  let eventHandler: EventHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    eventHandler = jest.fn();
    eventBus = createEventBus(contractViolationHandler);
    registerEventName(eventBus, eventName);
  });

  test('should successfully subscribe a handler to a registered event name', () => {
    subscribeHandlerToEventName(eventBus, eventName, eventHandler);
    expect(contractViolationHandler).not.toHaveBeenCalled();
  });

  test('should fail to subscribe a handler to an invalid event name', () => {
    subscribeHandlerToEventName(eventBus, 'Bad name', eventHandler);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });

  test('should fail to subscribe a handler to an un-registered event name', () => {
    subscribeHandlerToEventName(eventBus, anotherEventName, eventHandler);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });
});

describe('subscribeHandlersToEventName()', () => {
  const eventName = 'MyService.EVENT';
  const anotherEventName = 'MyService.ANOTHER_EVENT';

  let eventHandlerOne: EventHandler;
  let eventHandlerTwo: EventHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    eventHandlerOne = jest.fn();
    eventHandlerTwo = jest.fn();
    eventBus = createEventBus(contractViolationHandler);
  });

  test('should successfully subscribe handlers to a registered event name', () => {
    registerEventName(eventBus, eventName);
    subscribeHandlersToEventName(eventBus, eventName, [eventHandlerOne, eventHandlerTwo]);
    expect(contractViolationHandler).not.toHaveBeenCalled();
  });

  test('should fail to subscribe handlers to an invalid event name', () => {
    registerEventName(eventBus, eventName);
    subscribeHandlersToEventName(eventBus, 'Bad name', [eventHandlerOne, eventHandlerTwo]);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });

  test('should fail to subscribe handlers to an un-registered event name', () => {
    registerEventName(eventBus, eventName);
    subscribeHandlersToEventName(eventBus, anotherEventName, [eventHandlerOne, eventHandlerTwo]);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });
});

describe('publishEvent()', () => {
  const eventName = 'MyService.EVENT';
  const event = { name: eventName, data: 'data' };

  let eventHandlerOne: EventHandler;
  let eventHandlerTwo: EventHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    eventHandlerOne = jest.fn(() => right([]));
    eventHandlerTwo = jest.fn(() => right([]));
    eventBus = createEventBus(contractViolationHandler);
  });

  test('should successfully publish to a single subscriber', () => {
    registerEventName(eventBus, eventName);
    subscribeHandlerToEventName(eventBus, eventName, eventHandlerOne);
    publishEvent(eventBus, event);
    expect(eventHandlerOne).toHaveBeenCalledWith({ name: eventName, data: 'data' });
    expect(eventHandlerOne).toHaveBeenCalledTimes(1);
  });

  test('should successfully publish to multiple subscribers', () => {
    registerEventName(eventBus, eventName);
    subscribeHandlersToEventName(eventBus, eventName, [eventHandlerOne, eventHandlerTwo]);
    publishEvent(eventBus, event);
    expect(eventHandlerOne).toHaveBeenCalledWith({ name: eventName, data: 'data' });
    expect(eventHandlerOne).toHaveBeenCalledTimes(1);
    expect(eventHandlerTwo).toHaveBeenCalledWith({ name: eventName, data: 'data' });
    expect(eventHandlerTwo).toHaveBeenCalledTimes(1);
  });

  test('should report a contract violation if the event name in the event is invalid', () => {
    const event = { name: 'Invalid', data: 'data' };
    publishEvent(eventBus, event);
    expect(contractViolationHandler).toHaveBeenCalled();
  });

  test('should report a contract violation if the event name is unregistered', () => {
    const event = { name: 'MyService.EVENT', data: 'data' };
    publishEvent(eventBus, event);
    expect(contractViolationHandler).toHaveBeenCalled();
  });
});

describe('publishEvents()', () => {
  const eventName = 'MyService.EVENT';
  const oneEventName = 'MyService.ONE_EVENT';
  const anotherEventName = 'MyService.ANOTHER_EVENT';

  const event = { name: eventName, data: 'data' };
  const oneEvent = { name: oneEventName, data: 'info' };
  const anotherEvent = { name: anotherEventName, data: 'details' };

  let eventHandlerOne: EventHandler;
  let eventHandlerTwo: EventHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    eventHandlerOne = jest.fn(() => right([]));
    eventHandlerTwo = jest.fn(() => right([]));
    eventBus = createEventBus(contractViolationHandler);
  });

  test('should successfully publish multiple events', () => {
    registerEventNames(eventBus, [eventName, oneEventName, anotherEventName]);
    publishEvents(eventBus, [event, oneEvent, anotherEvent]);
  });

  test('should publish good events and fail to publish invalid events', () => {
    const badEvent = { name: 'bad', data: 'worse' };
    const unregisteredEvent = { name: 'MyService.UNREGISTERED_EVENT', data: 'worse' };
    registerEventNames(eventBus, [eventName, oneEventName, anotherEventName]);
    subscribeHandlerToEventName(eventBus, oneEventName, eventHandlerOne);
    subscribeHandlerToEventName(eventBus, anotherEventName, eventHandlerTwo);
    publishEvents(eventBus, [event, badEvent, oneEvent, anotherEvent, unregisteredEvent]);
    expect(contractViolationHandler).toHaveBeenCalledTimes(2);
    expect(eventHandlerOne).toHaveBeenCalledTimes(1);
    expect(eventHandlerTwo).toHaveBeenCalledTimes(1);
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
