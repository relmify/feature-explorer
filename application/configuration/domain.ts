import { EventBus, EventName, EventRegistrationInfoDto } from '../framework/eventBus';
import { subscribeToEvent, getRegisteredEventNames } from '../framework/eventBus';
import { isLeft, Either, left, fold } from 'fp-ts/lib/Either';
import { Errors } from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { EventsConfiguration } from './types';

/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */

// eslint-disable-next-line functional/functional-parameters
export const getEventNames = (registrationInfo: EventRegistrationInfoDto): readonly EventName[] => {
  type ErrorsAndNames = { readonly errors: readonly string[]; readonly names: readonly EventName[] };
  type ErrorOrEventName = Either<string, EventName>;

  const liftDecodeResult = (decodeResult: Either<Errors, EventName>): ErrorOrEventName => {
    return isLeft(decodeResult)
      ? left(PathReporter.report(decodeResult).reduce((acc, cur) => acc + '\n' + cur, ''))
      : decodeResult;
  };

  const errorsAndNames: ErrorsAndNames = registrationInfo.localEventNames.reduce(
    (acc: ErrorsAndNames, localEventString: string) => {
      const result: ErrorOrEventName = liftDecodeResult(
        EventName.decode(`${registrationInfo.serviceName}.${localEventString}`),
      );
      return fold(
        (errorString: string): ErrorsAndNames => {
          return { errors: [...acc.errors, errorString], names: acc.names };
        },
        (eventName: EventName): ErrorsAndNames => {
          return { errors: acc.errors, names: [...acc.names, eventName] };
        },
      )(result);
    },
    { errors: [], names: [] },
  );

  const errors = errorsAndNames.errors;
  const names = errorsAndNames.names;

  // Should only log errors here when there is a coding error
  if (errors.length > 0) {
    console.log('Skipping invalid event names');
    errors.map(error => console.log(error));
  }

  return names;
};

export const subscribeToEvents = (eventBus: EventBus, configuration: EventsConfiguration): void => {
  const registeredEventNames = getRegisteredEventNames(eventBus);
  registeredEventNames.map(eventName => {
    const eventHandlers = configuration.getHandlersFromNameFunctions
      .map(fromNameFunction => fromNameFunction(eventName))
      .reduce((acc, cur) => {
        return cur !== [] ? [...acc, ...cur] : acc;
      }, []);
    subscribeToEvent(eventBus)(eventName, eventHandlers);
  });
};
