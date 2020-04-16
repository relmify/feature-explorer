import { UnvalidedFileDto } from './externalTypes';
import { ValidatedFileDto, InvalidFileDataDto } from './types';

//
// Service Name
//
export const ServiceName = 'Validator';

//
// Event Names
//
export const Commands = ['VALIDATE_FILE'];
export const Queries = [];
export const SuccessEvents = ['FILE_VALIDATED'];
export const ErrorEvents = ['FILE_VALIDATION_FAILED'];
export const Events = [...Commands, ...Queries, ...SuccessEvents, ...ErrorEvents];

//
// Event DTOs
//
export type ValidateFle = { readonly name: 'VALIDATE_FILE'; readonly data: UnvalidedFileDto };
export type FileValidated = { readonly name: 'FILE_WATCH_STOPPED'; readonly data: ValidatedFileDto };
export type FileValidatonFailed = { readonly name: 'FILE_VALIDATION_FAILED'; readonly data: InvalidFileDataDto };

//
// Error Kinds
//
export const ErrorKinds = ['INVALID_FILE_DATA'];
