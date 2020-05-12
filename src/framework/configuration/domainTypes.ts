import { EventName, GetHandlers } from '../eventBus';
import { ServiceName } from '../eventBus/domainTypes';

export type EventsConfiguration = {
  readonly allEventNames: readonly EventName[];
  readonly allGetEventHandlersFunctions: readonly GetHandlers[];
};

export type ServiceDependencies = unknown;

export type ServiceConfiguration = {
  readonly configuration: readonly [ServiceName, ServiceDependencies];
};

export type ServicesConfiguration = {
  readonly servicesConfiguration: readonly ServiceConfiguration[];
};
