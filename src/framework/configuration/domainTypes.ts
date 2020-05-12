import { MessageType, GetHandlers } from '../messageBus';
import { ServiceName } from '../messageBus/domainTypes';

export type Messagesconfiguration = {
  readonly allMessageTypes: readonly MessageType[];
  readonly allGetMessageHandlersFunctions: readonly GetHandlers[];
};

export type ServiceDependencies = unknown;

export type ServiceConfiguration = {
  readonly configuration: readonly [ServiceName, ServiceDependencies];
};

export type ServicesConfiguration = {
  readonly servicesConfiguration: readonly ServiceConfiguration[];
};
