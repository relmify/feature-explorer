import { File } from './ExternalTypes';

export enum WatcherEvents {
  fileUpdated = 'FILE_CREATED',
  fileCreated = 'FILE_UPDATED',
  fileDeleted = 'FILE_DELETED',
}

export type WatcherEvent = {
  readonly eventType: WatcherEvents;
  readonly file: File;
};

export type FileCreated = { readonly eventType: WatcherEvents.fileUpdated } & WatcherEvent;
export type FileUpdated = { readonly eventType: WatcherEvents.fileUpdated } & WatcherEvent;
