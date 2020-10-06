import * as d from './domain';
import * as dt from './domainTypes';

import { Application } from './interfaceTypes';
import { ContractViolationHandler } from '../messageBus/domainTypes';

export const initializeApplication = (
  contractViolationHandler: ContractViolationHandler = d.contractViolationHandler,
): Application => {
  const framework = d.initializeFramework(contractViolationHandler);
  const domain = d.initializeDomain(framework);
  return { framework: framework, domain: domain };
};

export const configureApplication = (
  initializedApplication: Application,
  messagesConfiguration: dt.MessagesConfiguration = d.messagesConfiguration,
): Application => {
  const framework = d.configureFramework(initializedApplication.framework, messagesConfiguration);
  const domain = d.configureDomain(initializedApplication.domain);
  return { framework: framework, domain: domain };
};
