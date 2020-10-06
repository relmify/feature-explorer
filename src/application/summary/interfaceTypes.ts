import * as t from 'io-ts';
import * as dt from './domainTypes';
import { ContractViolation } from '../../framework/messageBus';

//
// Constant values
//
export const ServiceName = 'Summary';

const Commands = [
  'ACTIVATE_LIVE_SUMMARY',
  'DEACTIVATE_LIVE_SUMMARY',
  'REACTIVATE_LIVE_SUMMARY',
  'UPDATE_DIRECTORY_SEARCH_PATTERNS',
  'REFRESH_SUMMARY',
  'REFRESH_SUMMARY_ITEM',
];
const Queries = ['GET_SUMMARY_ITEM'];
const SuccessEvents = [
  'LIVE_SUMMARY_ACTIVATED',
  'LIVE_SUMMARY_DEACTIVATED',
  'LIVE_SUMMARY_REACTIVATED',
  'DIRECTORY_SEARCH_PATTERNS_UPDATED',
  'SUMMARY_REFRESH_INITIATED',
  'SUMMARY_ITEM_REFRESH_INITIATED',
  'SUMMARY_ITEM_ADDED',
  'SUMMARY_ITEM_UPDATED',
  'SUMMARY_ITEM_REMOVED',
];
const FailureEvents = [
  'FAILED_TO_ACTIVATE_LIVE_SUMMARY',
  'FAILED_TO_DEACTIVATE_LIVE_SUMMARY',
  'FAILED_TO_REACTIVATE_LIVE_SUMMARY',
  'FAILED_TO_UPDATE_DIRECTORY_SEARCH_PATTERNS',
  'FAILED_TO_GET_SUMMARY_ITEM',
  'FAILED_TO_REFRESH_SUMMARY',
  'FAILED_TO_REFRESH_SUMMARY_ITEM',
];

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
export type DirectorySearchPatterns = t.OutputOf<typeof dt.DirectorySearchPatterns>;

//
// Commands
//
export type ActivateLiveSummary = {
  readonly name: 'Summary.ACTIVATE_LIVE_SUMMARY';
  readonly data: DirectorySearchPatterns;
};

//
// Queries
//

//
// Success Events
//
export type LiveSummaryActivated = {
  readonly name: 'Summary.LIVE_SUMMARY_ACTIVATED';
  readonly data: undefined;
};

//
// Failure Events
//
export type FailedToActivateLiveSummary = {
  readonly name: 'Summary.FAILED_TO_ACTIVATE_LIVE_SUMMARY';
  readonly data: undefined;
};

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
