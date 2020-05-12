//
// Service Name
//
export const ServiceName = 'Filterer';

//
// Messages
//
export const Commands = ['FILTER_ITEM'];
export const Queries = [];
export const SuccessEvents = ['ITEM_VISBILITY_UNCHANGED', 'ITEM_NOW_VISIBLE', 'ITEM_NOW_HIDDEN'];
export const ErrorEvents = ['INVALID_FILTER_CRITERIA'];
export const Messages = [...Commands, ...Queries, ...SuccessEvents, ...ErrorEvents];

// eslint-disable-next-line functional/functional-parameters
export const getMessageTypes = (): readonly string[] => {
  return Messages.map(localName => `${ServiceName}.${localName}`);
};
