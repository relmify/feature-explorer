import * as t from 'io-ts';
import { NonEmptyString } from '../../../common/types';

//
// Commmands
//
export const WatcherCommands = ['START_FILE_WATCH', 'STOP_FILE_WATCH'];

export type WatchSpecifier = {
  readonly rootDirectory: string;
  readonly globPattern: string;
};
export type WatcherId = string;

type WatcherCommandTypeBrand = { readonly WatcherCommandType: unique symbol };
const WatchercCommandType = t.brand(
  t.string,
  (str): str is t.Branded<string, WatcherCommandTypeBrand> => typeof str === 'string' && WatcherCommands.includes(str),
  'WatcherCommandType',
);
type WatcherCommandType = t.TypeOf<typeof WatchercCommandType>;
export { WatchercCommandType };

export type StartFileWatchCommand = { readonly name: 'START_FILE_WATCH'; readonly data: WatchSpecifier };
export type StopFileWatchCommand = { readonly name: 'STOP_FILE_WATCH'; readonly data: WatcherId };

//
// Success Events
//
export const WatcherSuccessEvents = [
  'FILE_WATCH_STARTED',
  'FILE_WATCH_STOPPED',
  'FILE_CREATED',
  'FILE_DELETED',
  'FILE_MOVED',
  'FILE_CONTENTS_UPDATED',
];
export const WatcherErrorEvents = ['UNABLE_TO_START_FILE_WATCH', 'UNABLE_TO_STOP_FILE_WATCH'];

// eslint-disable-next-line functional/functional-parameters
export const getSuccessEvents = (): ReadonlyArray<string> => WatcherSuccessEvents;

// eslint-disable-next-line functional/functional-parameters
export const getErrorEvents = (): ReadonlyArray<string> => WatcherErrorEvents;

export type WatcherSuccessEventTypeBrand = { readonly WatcherSuccessEventType: unique symbol };
const WatcherSuccessEventType = t.brand(
  t.string,
  (str): str is t.Branded<string, WatcherSuccessEventTypeBrand> =>
    typeof str === 'string' && WatcherSuccessEvents.includes(str),
  'WatcherSuccessEventType',
);
type WatcherSuccessEventType = t.TypeOf<typeof WatcherSuccessEventType>;
export type WatcherSuccessEventTypeO = ReturnType<typeof WatcherSuccessEventType.encode>;
export { WatcherSuccessEventType };

export type WatcherErrorEventTypeBrand = { readonly WatcherErrorEventType: unique symbol };
const WatcherErrorEventType = t.brand(
  t.string,
  (str): str is t.Branded<string, WatcherErrorEventTypeBrand> =>
    typeof str === 'string' && WatcherErrorEvents.includes(str),
  'WatcherErrorEventType',
);
type WatcherErrorEventType = t.TypeOf<typeof WatcherErrorEventType>;
export { WatcherErrorEventType };

export type WatcherEventType = WatcherSuccessEventType | WatcherErrorEventType;

const FileWatcher = t.type({
  watcherId: NonEmptyString,
  rootDirectory: NonEmptyString,
  globPattern: NonEmptyString,
});
type FileWatcher = t.TypeOf<typeof FileWatcher>;
export { FileWatcher };
export type FileWatcherDTO = ReturnType<typeof FileWatcher.encode>;

const WatchedFile = t.type({
  fileID: NonEmptyString,
  fileName: NonEmptyString,
  filePath: NonEmptyString,
});
type WatchedFile = t.TypeOf<typeof WatchedFile>;
export { WatchedFile };
export type WatchedFileDTO = ReturnType<typeof WatchedFile.encode>;

export type FileWatchStarted = { readonly name: 'FILE_WATCH_STARTED'; readonly data: FileWatcherDTO };
export type FileWatchStopped = { readonly name: 'FILE_WATCH_STOPPED'; readonly data: FileWatcherDTO };
export type FileCreated = { readonly name: 'FILE_CREATED'; readonly data: WatchedFileDTO };
export type FileDeleted = { readonly name: 'FILE_DELETED'; readonly data: WatchedFileDTO };
export type FileMoved = { readonly name: 'FILE_MOVED'; readonly data: WatchedFileDTO };
export type FileContentsUpdated = { readonly name: 'FILE_CONTENTS_UPDATED'; readonly data: WatchedFileDTO };

//
// Error Events
//
export const WatcherErrorTypes = ['INVALID_PATH_OR_GLOB', 'NO_SUCH_FILE_WATCHER'];

export type WatcherErrorTypeBrand = { readonly WatcherErrorType: unique symbol };
const WatcherErrorType = t.brand(
  t.string,
  (str): str is t.Branded<string, WatcherErrorTypeBrand> => typeof str === 'string' && WatcherErrorTypes.includes(str),
  'WatcherErrorType',
);
type WatcherErrorType = t.TypeOf<typeof WatcherErrorType>;
export { WatcherErrorType };

const WatcherError = t.type({
  type: WatcherErrorType,
  message: NonEmptyString,
});
type WatcherError = t.TypeOf<typeof WatcherError>;
export { WatcherError };
export type WatcherErrorDTO = ReturnType<typeof WatcherError.encode>;

//
// Functions
//

// eslint-disable-next-line functional/functional-parameters
export const getWatcherEvents = (): readonly string[] => {
  return [...WatcherCommands, ...WatcherSuccessEvents, ...WatcherErrorEvents];
};
