import * as mb from '../../framework/messageBus';
import * as dt from './domainTypes';

/**
 * @packageDocumentation
 * The Watcher service watches for changes to .feature files
 */

export const initializeWatcher = (bus: mb.MessageBus): dt.Watcher => {
  return {
    dependencies: {
      messageBus: bus,
    },
    state: {
      serviceName: 'Watcher',
    },
  };
};

// Behaviors

// export const createWatcher = (
//     fsWatcher: FileSystemWatcher,
//     globPattern: string,
//     rootDirectory: string,
//   ): Either<Error, Watcher> => {
//     return left(Error('Not Implemented'));
//   };
