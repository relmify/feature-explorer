import { Either } from 'fp-ts/lib/Either';

export type File = {
  readonly id: string;
  readonly path: string;
  readonly name: string;
  readonly created: number;
  readonly updated: number;
};

/* eslint-disable-next-line functional/no-return-void */
export type WatcherCallback = (file: File) => void;
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
