import { ServiceName, Events } from './events';

// eslint-disable-next-line functional/functional-parameters
export const getEventNames = (): readonly string[] => {
  return Events.map(eventName => `${ServiceName}.${eventName}`);
};
