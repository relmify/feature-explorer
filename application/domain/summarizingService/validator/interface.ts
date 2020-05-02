import { Event, EventName, EventHandler, ContractViolation } from '../../../framework/eventBus';
import { Either, left } from 'fp-ts/lib/Either';
import * as dt from './domainTypes';
import * as it from './interfaceTypes';

//
// Command Handlers
//

export const validateFileHandler: EventHandler = (event: Event): Either<ContractViolation, readonly Event[]> => {
  return left(new it.ValidatorContractViolation('Validate file command not implemented'));
};

//
// Interface Functions
//

/**
 * Get the event handlers for all of the events that are subscribed to by this service.
 */
export const getEventHandlers = (eventName: EventName): readonly EventHandler[] => {
  const eventHandlers: Record<string, readonly EventHandler[]> = {
    'Validator.VALIDATE_FILE': [validateFileHandler],
  };
  return eventHandlers[eventName] || [];
};

/**
 * Get the names of all the events that are published by this service
 */
// eslint-disable-next-line functional/functional-parameters
export const getEventNames = (): readonly EventName[] => {
  return dt.Events.map(localName => dt.ServiceName + '.' + localName);
};

/**
 * Initialize service dependencies.
 */
// eslint-disable-next-line functional/no-return-void
export const initializeService = (dependencies: it.Dependencies): it.Service => {
  // eslint-disable-next-line functional/no-expression-statement
  dt.Service.next({
    dependencies: dependencies,
  });
  return dt.Service;
};
