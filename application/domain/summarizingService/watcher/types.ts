import * as t from 'io-ts';
import { ServiceName, ErrorKinds } from './events';
import { NonEmptyString } from '../../../common/types';
import { getEventNames } from './api';

/** WatcherEventName */
export type WatcherEventNameBrand = { readonly WatcherEventName: unique symbol };
const WatcherEventName = t.brand(
  t.string,
  (str): str is t.Branded<string, WatcherEventNameBrand> =>
    typeof str === 'string' && getEventNames().includes(`${ServiceName}.${str}`),
  'WatcherEventName',
);
type WatcherEventName = t.TypeOf<typeof WatcherEventName>;
export { WatcherEventName };
export type WatcherEventNameDto = ReturnType<typeof WatcherEventName.encode>;

/** WatcherId */
export type WatcherIdBrand = { readonly WatcherId: unique symbol };
const WatcherId = t.brand(t.string, (str): str is t.Branded<string, WatcherIdBrand> => str.length > 0, 'WatcherId');
type WatcherId = t.TypeOf<typeof WatcherId>;
export { WatcherId };
export type WatcherIdDto = ReturnType<typeof WatcherId.encode>;

/** FileWatcher */
const FileWatcher = t.type({
  watcherId: WatcherId,
  rootDirectory: NonEmptyString,
  globPattern: NonEmptyString,
});
type FileWatcher = t.TypeOf<typeof FileWatcher>;
export { FileWatcher };
export type FileWatcherDto = ReturnType<typeof FileWatcher.encode>;

/** WatchedFile */
const WatchedFile = t.type({
  fileID: NonEmptyString,
  fileName: NonEmptyString,
  filePath: NonEmptyString,
});
type WatchedFile = t.TypeOf<typeof WatchedFile>;
export { WatchedFile };
export type WatchedFileDto = ReturnType<typeof WatchedFile.encode>;

/** WatchSpecifier */
const WatchSpecifier = t.type({
  rootDirectory: NonEmptyString,
  globPattern: NonEmptyString,
});
type WatchSpecifier = t.TypeOf<typeof WatchSpecifier>;
export { WatchSpecifier };
export type WatchSpecifierDto = ReturnType<typeof WatchSpecifier.encode>;

/** WatcherErrorKind */
export type WatcherErrorKindBrand = { readonly WatcherErrorKind: unique symbol };
const WatcherErrorKind = t.brand(
  t.string,
  (str): str is t.Branded<string, WatcherErrorKindBrand> => ErrorKinds.includes(str),
  'WatcherErrorKind',
);
type WatcherErrorKind = t.TypeOf<typeof WatcherErrorKind>;
export { WatcherErrorKind };

/** WatcherError */
const WatcherError = t.type({
  kind: WatcherErrorKind,
  message: NonEmptyString,
});
type WatcherError = t.TypeOf<typeof WatcherError>;
export { WatcherError };
export type WatcherErrorDto = ReturnType<typeof WatcherError.encode>;
