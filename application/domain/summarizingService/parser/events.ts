//
// Service Name
//
export const ServiceName = 'Parser';

//
// Events
//
export const Commands = ['PARSE_FILE'];
export const Queries = [];
export const SuccessEvents = ['FILE_PARSED'];
export const ErrorEvents = ['INVALID_FILE_PATH'];
export const Events = [...Commands, ...Queries, ...SuccessEvents, ...ErrorEvents];
