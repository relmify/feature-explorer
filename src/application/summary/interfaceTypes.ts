import * as t from 'io-ts';
import * as dt from './domainTypes';
import { ContractViolation } from '../../framework/messageBus';

//
// Constant values
//
export const ServiceName = 'Summary';

const Commands = ['SET_DIRECTORY_SEARCH_PATTERN'];
const Queries: readonly string[] = [];
const SuccessEvents = ['DIRECTORY_SEARCH_PATTERN_SET'];
const FailureEvents = ['FAILED_TO_SET_DIRECTORY_SEARCH_PATTERN'];

export const Messages = [...Commands, ...Queries, ...SuccessEvents, ...FailureEvents];
export const FileItemTypes = dt.FileItemTypes;
export const FileContentItemTypes = dt.FileContentItemTypes;

//
// Service and dependencies
//
export type Service = dt.Service;
export type Dependencies = dt.Dependencies;

//
// Message data types
//
export type Item = t.OutputOf<typeof dt.Item>;
export type ItemType = t.OutputOf<typeof dt.ItemType>;
export type FilePath = t.OutputOf<typeof dt.FileItemPath>;
export type FileItem = t.OutputOf<typeof dt.FileItem>;
export type FileItemType = t.OutputOf<typeof dt.FileItemType>;
export type FileContentItem = t.OutputOf<typeof dt.FileContentItem>;
export type FileContentItemType = t.OutputOf<typeof dt.FileContentItemType>;
export type DirectorySearchPattern = t.OutputOf<typeof dt.DirectorySearchPattern>;

//
// Commands
//
export type SetDirectorySearchPattern = {
  readonly name: 'Summary.SET_DIRECTORY_SEARCH_PATTERN';
  readonly data: DirectorySearchPattern;
};

//
// Success Events
//
export type DirectorySearchPatternSet = {
  readonly name: 'Summary.DIRECTORY_SEARCH_PATTERN_SET';
  readonly data: DirectorySearchPattern;
};

//
// Failure Events
//
export type FailedToSetDirectorySearchPattern = {
  readonly name: 'Summary.FAILED_TO_SET_DIRECTORY_SEARCH_PATTERN';
  readonly data: DirectorySearchPattern;
};

//
// External Events
//

//
// Custom contract violation error type
//

// eslint-disable-next-line functional/no-class
export class ValidatorContractViolation extends ContractViolation {
  constructor(message: string) {
    // eslint-disable-next-line functional/no-expression-statement
    super(ServiceName, message);
  }
}
