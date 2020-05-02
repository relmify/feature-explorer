import * as d from './domain';
import * as dt from './domainTypes';

import { ApplicationConfiguration } from './interfaceTypes';

export const configureApplication = (
  configuration: dt.EventsConfiguration = d.eventsConfiguration,
): ApplicationConfiguration => {
  const eventBusConfiguration = d.initializeEventBus(configuration);
  const servicesConfiguration = d.initializeServices(eventBusConfiguration.eventBus);

  return { ...eventBusConfiguration, ...servicesConfiguration };
};
