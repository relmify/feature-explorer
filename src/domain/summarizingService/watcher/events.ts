import { NonEmptyString } from '../../../common/types';

export const WatcherSuccessEvents = [
  'FILE_WATCH_STARTED',
  'FILE_WATCH_STOPPED',
  'FILE_CREATED',
  'FILE_DELETED',
  'FILE_MOVED',
  'FILE_CONTENTS_UPDATED',
];
export const WatcherErrorEvents = ['UNABLE_TO_START_FILE_WATCH', 'UNABLE_TO_STOP_FILE_WATCH'];
export const WatcherEvents = [...WatcherSuccessEvents, ...WatcherErrorEvents];

export type WatcherEventTypeBrand = { readonly WatcherEvent: unique symbol };
export type WatcherEventType = WatcherEventTypeBrand & NonEmptyString;

export type FileWatcher = {
  readonly rootDirectory: NonEmptyString;
  readonly globPattern: NonEmptyString;
  readonly watcherId: NonEmptyString;
};

export type WatchedFile = {
  readonly fileID: string;
  readonly fileName: string;
  readonly filePath: string;
};

export type FileWatchStarted = { readonly eventType: WatcherEventType } & FileWatcher;
export type FileWatchStopped = { readonly eventType: WatcherEventType } & FileWatcher;
export type FileCreated = { readonly eventType: WatcherEventType } & WatchedFile;
export type FileDeleted = { readonly eventType: WatcherEventType } & WatchedFile;
export type FileMoved = { readonly eventType: WatcherEventType } & WatchedFile;
export type FileContentsUpdated = { readonly eventType: WatcherEventType } & WatchedFile;

export const WatcherErrorTypes = ['INVALID_PATH_OR_GLOB', 'NO_SUCH_FILE_WATCHER'];

// todo: change to specific branded types
export type WatcherErrorEventType = NonEmptyString;
export type WatcherErrorType = NonEmptyString;
export type WatcherErrorMessage = NonEmptyString;

export type WatcherError = {
  readonly type: WatcherErrorType;
  readonly message: WatcherErrorMessage;
};

export type UnableToStartFileWatch = {
  readonly eventType: WatcherErrorEventType;
} & WatcherError;
export type UnableToStopFileWatch = { readonly eventType: WatcherErrorEventType } & WatcherError;
