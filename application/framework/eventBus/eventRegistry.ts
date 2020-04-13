import { BehaviorSubject } from 'rxjs';

export type RegisteredEvents = ReadonlyArray<string>;
export type EventRegistry = BehaviorSubject<RegisteredEvents>;

export const createEventRegistry = (initialValue: RegisteredEvents = []): EventRegistry => {
  return new BehaviorSubject<RegisteredEvents>(initialValue.length > 0 ? initialValue : []);
};

export const registerEvents = (eventRegistry: EventRegistry, eventNames: ReadonlyArray<string>): EventRegistry => {
  const registeredEvents: RegisteredEvents = eventRegistry.getValue();
  // eslint-disable-next-line functional/no-expression-statement
  eventRegistry.next([...registeredEvents, ...eventNames]);
  return eventRegistry;
};

export const isRegisteredEvent = (eventRegistry: EventRegistry, name: string): boolean => {
  return eventRegistry.getValue().includes(name);
};

export const getRegisteredEventNames = (eventRegistry: EventRegistry): readonly string[] => {
  return eventRegistry.getValue();
};
