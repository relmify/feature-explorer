import { EventBus, ContractViolationHandler } from '../interfaceTypes';
import { createEventBus, registerEvents, getRegisteredEvents, errorsToContractViolation } from '../interface';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/lib/Either';

describe('createEventBus()', () => {
  test('should return an event bus with an event Registry', () => {
    const contractViolationHandler: ContractViolationHandler = jest.fn();
    const eventBus = createEventBus(contractViolationHandler);
    expect(eventBus.eventChannel).not.toEqual(undefined);
    expect(eventBus.registry).not.toEqual(undefined);
  });
});

describe('registerEvents()', () => {
  const eventName = 'MyService.EVENT';
  let eventBus: EventBus;
  let contractViolationHandler: ContractViolationHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    eventBus = createEventBus(contractViolationHandler);
  });

  test('should successfully register a new valid event name', () => {
    registerEvents(eventBus, [eventName]);
    expect(contractViolationHandler).not.toHaveBeenCalled();
    expect(getRegisteredEvents(eventBus)).toContain(eventName);
  });

  test('should not allow you to register an empty event name', () => {
    const invalidEventName = '';
    registerEvents(eventBus, [invalidEventName]);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
    expect(getRegisteredEvents(eventBus)).not.toContain(invalidEventName);
  });

  test('should not allow you to register an invalid event name', () => {
    const invalidEventName = 'InavlidName';
    registerEvents(eventBus, [invalidEventName]);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
    expect(getRegisteredEvents(eventBus)).not.toContain(invalidEventName);
  });

  test('should not allow you to register the same event twice', () => {
    registerEvents(eventBus, [eventName]);
    registerEvents(eventBus, [eventName]);
    expect(contractViolationHandler).toHaveBeenCalledTimes(1);
  });
});

describe('getRegisteredEvents()', () => {
  const oneEventName = 'MyService.ONE_EVENT';
  const anotherEventName = 'MyService.ANOTHER_EVENT';
  let eventBus: EventBus;
  let contractViolationHandler: ContractViolationHandler;

  beforeEach(() => {
    contractViolationHandler = jest.fn();
    eventBus = createEventBus(contractViolationHandler);
  });

  test('should return all events when they are registered separately', () => {
    registerEvents(eventBus, [oneEventName]);
    registerEvents(eventBus, [anotherEventName]);
    expect(getRegisteredEvents(eventBus)).toEqual([oneEventName, anotherEventName]);
  });

  test('should return all events when they are registered together', () => {
    registerEvents(eventBus, [oneEventName, anotherEventName]);
    expect(getRegisteredEvents(eventBus)).toEqual([oneEventName, anotherEventName]);
  });
});

describe('subscribeToEvent()', () => {
  test.skip('should successfully subscribe a handler to a registered event', () => {});
  test.skip('should fail to subscribe a handler to an un-registered event', () => {});
  test.skip('should result in the handler being called when the correct event type is published', () => {});
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
