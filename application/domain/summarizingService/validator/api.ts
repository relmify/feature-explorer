import { ServiceName, Events } from './events';

// eslint-disable-next-line functional/functional-parameters
export const getValidatorEventNames = (): readonly string[] => {
  return Events.map(event => `${ServiceName}.${event}`);
};
