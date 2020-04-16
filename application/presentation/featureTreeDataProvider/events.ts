//
// Service Name
//
export const ServiceName = 'FeatureTree';

//
// Events
//
export const Commands = ['SET_FEATURE_ROOT'];
export const Queries = [];
export const SuccessEvents = ['FEATURE_ROOT_SET'];
export const ErrorEvents = ['FAILED_TO_SET_FEATURE_ROOT'];

//
// Interface
//
// eslint-disable-next-line functional/functional-parameters
export const getFeatureTreeEventNames = (): readonly string[] => {
  return [...Commands, ...SuccessEvents, ...ErrorEvents].map(event => `${ServiceName}.${event}`);
};
