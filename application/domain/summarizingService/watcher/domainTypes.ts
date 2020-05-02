import * as t from 'io-ts';
import { NonEmptyString } from '../../../common/types';
import { EventBus } from '../../../framework/eventBus';
import { BehaviorSubject } from 'rxjs';

//
// Constant values
//

export const ServiceName = 'Watcher';
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
export const FailureEvents = ['UNABLE_TO_START_FILE_WATCH', 'UNABLE_TO_STOP_FILE_WATCH'];
export const Events = [...Commands, ...Queries, ...SuccessEvents, ...FailureEvents];
export const FailureKinds = ['INVALID_PATH_OR_GLOB', 'NO_SUCH_FILE_WATCHER'];

//
// Brands for branded types
//

type WatcherEventNameBrand = { readonly WatcherEventName: unique symbol };
type WatcherIdBrand = { readonly WatcherId: unique symbol };
type WatcherFailureKindBrand = { readonly WatcherFailureKind: unique symbol };

//
// Domain Types
//

export const WatcherEventName = t.brand(
  t.string,
  (str): str is t.Branded<string, WatcherEventNameBrand> =>
    typeof str === 'string' && Events.includes(`${ServiceName}.${str}`),
  'WatcherEventName',
);
export type WatcherEventName = t.TypeOf<typeof WatcherEventName>;

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

export type Dependencies = {
  readonly eventBus: EventBus;
  //readonly fileSystemWatcher: FileSystemWatcher;
};

export type State = {
  readonly dependencies: Dependencies | undefined;
  // readonly fileWatches: readonly FileWatch[];
};

const initialState: State = {
  dependencies: undefined,
};

export const Service = new BehaviorSubject<State>(initialState);
export type Service = typeof Service;
