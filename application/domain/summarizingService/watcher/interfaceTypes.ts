/**
 * Watcher interface types
 */
import * as t from 'io-ts';
import * as dt from './domainTypes';
import { ContractViolation } from '../../../framework/eventBus';

//
// Service and dependencies
//
export type Service = dt.Service;
export type Dependencies = dt.Dependencies;

//
// Event name type
//
export type WatcherEventName = t.OutputOf<typeof dt.WatcherEventName>;

//
// Event data types
//
export type FileWatcher = t.OutputOf<typeof dt.FileWatcher>;
export type WatchedFile = t.OutputOf<typeof dt.WatchedFile>;
export type WatchSpecifier = t.OutputOf<typeof dt.WatchSpecifier>;
export type WatcherId = t.OutputOf<typeof dt.WatcherId>;
export type WatcherFailure = t.OutputOf<typeof dt.WatcherFailure>;

//
// Commands
//
export type StartFileWatchCommand = {
  readonly name: 'Watcher.START_FILE_WATCH';
  readonly data: WatchSpecifier;
};
export type StopFileWatchCommand = {
  readonly name: 'Watcher.STOP_FILE_WATCH';
  readonly data: WatcherId;
};

//
// Success events
//
export type FileWatchStarted = {
  readonly name: 'Watcher.FILE_WATCH_STARTED';
  readonly data: FileWatcher;
};
export type FileWatchStopped = {
  readonly name: 'Watcher.FILE_WATCH_STOPPED';
  readonly data: FileWatcher;
};

//
// Generated events
//
export type FileCreated = {
  readonly name: 'Watcher.FILE_CREATED';
  readonly data: WatchedFile;
};
export type FileDeleted = {
  readonly name: 'Watcher.FILE_DELETED';
  readonly data: WatchedFile;
};
export type FileMoved = {
  readonly name: 'Watcher.FILE_MOVED';
  readonly data: WatchedFile;
};
export type FileContentsUpdated = {
  readonly name: 'Watcher.FILE_CONTENTS_UPDATED';
  readonly data: WatchedFile;
};

//
// Failure events
//
export type UnableToStartFileWatch = {
  readonly name: 'Watcher.UNABLE_TO_START_FILE_WATCH';
  readonly data: WatcherFailure;
};
export type UnableToStopFileWatch = {
  readonly name: 'Watcher.UNABLE_TO_STOP_FILE_WATCH';
  readonly data: WatcherFailure;
};

//
// Custom contract violation error type
//
// eslint-disable-next-line functional/no-class
export class WatcherContractViolation extends ContractViolation {
  constructor(message: string) {
    // eslint-disable-next-line functional/no-expression-statement
    super(dt.ServiceName, message);
  }
}
