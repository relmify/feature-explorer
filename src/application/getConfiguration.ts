import { createEventBus, EventBus } from '../framework/eventBus';

// import * as t from 'io-ts';

// import { FeatureTreeDataProvider } from '../presentation/FeatureTreeDataProvider';
// import { UrlWithParsedQuery } from 'url';

/* eslint-disable functional/functional-parameters */

export type ApplicationConfiguration = {
  readonly eventBus: EventBus;
};

const getEvents = (): readonly string[] => {
  const events: readonly string[] = [];
  return events;
};

export const getConfiguration = (): ApplicationConfiguration => {
  const events = getEvents();
  return {
    eventBus: createEventBus(events),
  };
};
