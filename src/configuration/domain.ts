import * as dt from './domainTypes';
import * as it from './interfaceTypes';
import * as eb from '../framework/eventBus';
import * as watcher from '../domain/summarizingService/watcher';

/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-conditional-statement */

//
// Initialize Event Bus Step
//

const errorHandler: eb.ContractViolationHandler = (error: Error) => {
  console.log(error.message);
};

export const eventsConfiguration: dt.EventsConfiguration = {
  allEventNames: [...watcher.getEventNames()],
  allGetEventHandlersFunctions: [watcher.getEventHandlers],
};

const subscribeToEvents = (eventBus: eb.EventBus, configuration: dt.EventsConfiguration): void => {
  const registeredEventNames = eb.getRegisteredEventNames(eventBus);
  registeredEventNames.map((eventName: eb.EventName) => {
    const eventHandlers = configuration.allGetEventHandlersFunctions
      .map(fromNameFunction => fromNameFunction(eventName))
      .reduce((acc, cur) => {
        return cur !== [] ? [...acc, ...cur] : acc;
      }, []);
    eb.subscribeHandlersToEventName(eventBus, eventName, eventHandlers);
  });
};

export const initializeEventBus = (configuration: dt.EventsConfiguration): it.EventBusConfiguration => {
  const eventBus = eb.createEventBus(errorHandler);
  eb.registerEventNames(eventBus, configuration.allEventNames);
  subscribeToEvents(eventBus, configuration);
  return { eventBus: eventBus };
};

//
// Initialize Services Step
//

export const initializeServices = (eventBus: eb.EventBus): it.ServicesConfiguration => {
  return {
    watcherService: watcher.initializeService({ eventBus: eventBus }),
  };
};
