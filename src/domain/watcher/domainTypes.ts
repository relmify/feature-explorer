import * as t from 'io-ts';
import { Either } from 'fp-ts/lib/Either';
import { NonEmptyString } from '../../framework/types';
import { MessageBus } from '../../framework/messageBus';

//
// Constant values
//
export const FailureKinds = ['INVALID_PATH_OR_GLOB', 'NO_SUCH_FILE_WATCHER'];

//
// Brands for branded types
//
type WatcherIdBrand = { readonly WatcherId: unique symbol };
type WatcherFailureKindBrand = { readonly WatcherFailureKind: unique symbol };
type DirectoryPathBrand = { readonly DirectoryPath: unique symbol };
type GlobPatternBrand = { readonly GlobPattern: unique symbol };
type FileIdBrand = { readonly FileId: unique symbol };

//
// Domain Types
//

type DirectoryPath = DirectoryPathBrand & NonEmptyString;
type GlobPattern = GlobPatternBrand & NonEmptyString;
type FileId = FileIdBrand & NonEmptyString;

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

export type FeatureWatcher<T> = {
  readonly rootDirectory: DirectoryPath;
  readonly globPattern: GlobPattern;
  readonly fileSystemWatcher: FileSystemWatcher<T>;
};

export type FeatureWatcherList<T> = readonly FeatureWatcher<T>[];

export const WatcherId = t.brand(
  t.string,
  (str): str is t.Branded<string, WatcherIdBrand> => str.length > 0,
  'WatcherId',
);
export type WatcherId = t.TypeOf<typeof WatcherId>;

export const FileWatcher = t.type({
  watcherId: WatcherId,
  rootDirectory: NonEmptyString,
  globPattern: NonEmptyString,
});
export type FileWatcher = t.TypeOf<typeof FileWatcher>;

export const WatchedFile = t.type({
  fileID: NonEmptyString,
  fileName: NonEmptyString,
  filePath: NonEmptyString,
});
export type WatchedFile = t.TypeOf<typeof WatchedFile>;

export const WatchSpecifier = t.type({
  rootDirectory: NonEmptyString,
  globPattern: NonEmptyString,
});
export type WatchSpecifier = t.TypeOf<typeof WatchSpecifier>;

export const WatcherFailureKind = t.brand(
  t.string,
  (str): str is t.Branded<string, WatcherFailureKindBrand> => FailureKinds.includes(str),
  'WatcherFailureKind',
);
export type WatcherFailureKind = t.TypeOf<typeof WatcherFailureKind>;

export const WatcherFailure = t.type({
  kind: WatcherFailureKind,
  message: NonEmptyString,
});
export type WatcherFailure = t.TypeOf<typeof WatcherFailure>;

//
// Service State
//

// export const Dependencies = t.type({
//   messageBus: t.unknown,
//   fileSystemWatcher: t.unknown,
// });
export type Dependencies = {
  readonly messageBus: MessageBus;
  //readonly fileSystemWatcher: FileSystemWatcher;
};

export type State = {
  readonly serviceName: string;
  // readonly fileWatches: readonly FileWatch[];
};

export type Watcher = {
  readonly dependencies: Dependencies;
  readonly state: State;
};
