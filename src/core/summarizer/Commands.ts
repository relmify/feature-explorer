import { ValidatedFile } from './ExternalTypes';

/**
 * Commands are events that the service receives from other services
 */
export enum CommandType {
  FilesValidated = 'FILES_VALIDATED',
  FilesMoved = 'FILES_MOVED',
  FilesRemoved = 'FILES_REMOVED',
}

export type FilesValidated = { readonly commandType: CommandType.FilesValidated } & readonly ValidatedFile[];
