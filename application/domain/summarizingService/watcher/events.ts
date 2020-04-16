import { FileWatcherDto, WatchedFileDto, WatchSpecifierDto, WatcherIdDto, WatcherErrorDto } from './types';

//
// Service Name
//
export const ServiceName = 'Watcher';

//
// Event Names
//
export const Commands = ['START_FILE_WATCH', 'STOP_FILE_WATCH'];
export const Queries = [];
export const SuccessEvents = [
  'FILE_WATCH_STARTED',
  'FILE_WATCH_STOPPED',
  'FILE_CREATED',
  'FILE_DELETED',
  'FILE_MOVED',
  'FILE_CONTENTS_UPDATED',
];
export const ErrorEvents = ['UNABLE_TO_START_FILE_WATCH', 'UNABLE_TO_STOP_FILE_WATCH'];
export const Events = [...Commands, ...Queries, ...SuccessEvents, ...ErrorEvents];

//
// Event DTOs
//
export type FileWatchStarted = { readonly name: 'FILE_WATCH_STARTED'; readonly data: FileWatcherDto };
export type FileWatchStopped = { readonly name: 'FILE_WATCH_STOPPED'; readonly data: FileWatcherDto };
export type FileCreated = { readonly name: 'FILE_CREATED'; readonly data: WatchedFileDto };
export type FileDeleted = { readonly name: 'FILE_DELETED'; readonly data: WatchedFileDto };
export type FileMoved = { readonly name: 'FILE_MOVED'; readonly data: WatchedFileDto };
export type FileContentsUpdated = { readonly name: 'FILE_CONTENTS_UPDATED'; readonly data: WatchedFileDto };
export type StartFileWatchCommand = { readonly name: 'START_FILE_WATCH'; readonly data: WatchSpecifierDto };
export type StopFileWatchCommand = { readonly name: 'STOP_FILE_WATCH'; readonly data: WatcherIdDto };
export type UnableToStartFileWatch = { readonly name: 'UNABLE_TO_START_FILE_WATCH'; readonly data: WatcherErrorDto };
export type UnableToStopFileWatch = { readonly name: 'UNABLE_TO_STOP_FILE_WATCH'; readonly data: WatcherErrorDto };

//
// Error Kinds
//
export const ErrorKinds = ['INVALID_PATH_OR_GLOB', 'NO_SUCH_FILE_WATCHER'];
