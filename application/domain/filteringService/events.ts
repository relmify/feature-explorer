//
// Service Name
//
export const ServiceName = 'Filterer';

//
// Events
//
export const Commands = ['FILTER_ITEM'];
export const Queries = [];
export const SuccessEvents = ['ITEM_VISBILITY_UNCHANGED', 'ITEM_NOW_VISIBLE', 'ITEM_NOW_HIDDEN'];
export const ErrorEvents = ['INVALID_FILTER_CRITERIA'];
export const Events = [...Commands, ...Queries, ...SuccessEvents, ...ErrorEvents];

// eslint-disable-next-line functional/functional-parameters
export const getFiltererEventNames = (): readonly string[] => {
  return Events.map(event => `${ServiceName}.${event}`);
};
