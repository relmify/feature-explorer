import * as d from './domain';
import * as dt from './domainTypes';

import { ApplicationConfiguration } from './interfaceTypes';

export const configureApplication = (
  configuration: dt.Messagesconfiguration = d.messagesConfiguration,
): ApplicationConfiguration => {
  const messageBusConfiguration = d.initializeMessageBus(configuration);
  const servicesConfiguration = d.initializeServices(messageBusConfiguration.messageBus);

  return { ...messageBusConfiguration, ...servicesConfiguration };
};
