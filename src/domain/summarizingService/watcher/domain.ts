/**
 * @packageDocumentation
 * The Watcher service watches for changes to .feature files
 */
import { NonEmptyString } from '../../../framework/types';
import { Either } from 'fp-ts/lib/Either';
import { WatchedFile } from './domainTypes';

/**
 * Model
 */
export type DirectoryPathBrand = { readonly DirectoryPath: unique symbol };
export type DirectoryPath = DirectoryPathBrand & NonEmptyString;

export type GlobPatternBrand = { readonly GlobPattern: unique symbol };
export type GlobPattern = GlobPatternBrand & NonEmptyString;

export type FileIdBrand = { readonly FileId: unique symbol };
export type FileId = FileIdBrand & NonEmptyString;

/* eslint-disable-next-line functional/no-return-void */
export type WatcherCallback = (file: WatchedFile) => void;
export type FileSystemWatcher<T> = {
  readonly createFileSystemWatcher: (
    glob: string,
    onCreate: WatcherCallback,
    onUpdate: WatcherCallback,
    onDelete: WatcherCallback,
  ) => Either<Error, T>;
  /* eslint-disable-next-line functional/no-return-void */
  readonly deleteFileSystemWatcher: (fileSystemWatcher: T) => void;
};

// The callbacks should create and dispatch the appropriate events.
// I think this is business logic... so can be represented here aside from
// the specific implementation of the file watcher itself.

export type Watcher<T> = {
  readonly rootDirectory: DirectoryPath;
  readonly globPattern: GlobPattern;
  readonly watcher: FileSystemWatcher<T>;
};

export type WatcherList<T> = readonly Watcher<T>[];

// Behaviors

// export const createWatcher = (
//     fsWatcher: FileSystemWatcher,
//     globPattern: string,
//     rootDirectory: string,
//   ): Either<Error, Watcher> => {
//     return left(Error('Not Implemented'));
//   };
