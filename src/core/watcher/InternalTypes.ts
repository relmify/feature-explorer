import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString';
import { FileSystemWatcher } from './ExternalTypes';

// Todo - convert to branded IO types that check these strings for validity?
export type DirectoryPath = NonEmptyString;
export type GlobPattern = NonEmptyString;
export type FileId = NonEmptyString;

export type Watcher<T> = {
  readonly rootDirectory: DirectoryPath;
  readonly globPattern: GlobPattern;
  readonly watcher: FileSystemWatcher<T>;
};

export type WatcherList<T> = readonly Watcher<T>[];

export type FileInfo = {
  readonly fileId: FileId;
};
