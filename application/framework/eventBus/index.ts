/**
 * EventBus public API
 *
 * Any EventBus implementation that complies with this API will be compatible
 * with EventBus client code.
 */
export {
  Event,
  EventName,
  EventHandler,
  EventBus,
  GetHandlersFunction,
  EventSubscription,
  EventRegistrationInfo,
  EventRegistrationInfoDto,
  GetRegistrationInfoFunction,
} from './types';

export { createEventBus, registerEvents, isRegisteredEvent, subscribeToEvent, getRegisteredEventNames } from './api';
