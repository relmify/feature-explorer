/**
 * Watcher Commands
 * @packageDocumentation
 */
import { NonEmptyString } from '../../../common/types';

export const WatcherCommands = ['START_FILE_WATCH', 'STOP_FILE_WATCH'];

export type WatchSpecifier = {
  readonly rootDirectory: string;
  readonly globPattern: string;
};
export type WatcherId = string;

type WatcherCommandTypeBrand = { readonly WatcherCommandType: unique symbol };

// To Do - use an actual Type codec instead of a branded type
export type WatcherCommandType = WatcherCommandTypeBrand & NonEmptyString;
export type StartFileWatch = { readonly commandType: WatcherCommandType } & WatchSpecifier;
export type StopFileWatch = { readonly commandType: WatcherCommandType } & WatcherId;
