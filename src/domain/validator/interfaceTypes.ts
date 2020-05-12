import { ContractViolation } from '../../framework/messageBus';
import * as dt from './domainTypes';
import * as t from 'io-ts';
import { ParsedFile } from '../parser';

//
// Constant values
//
export const ServiceName = 'Validator';

const Commands = ['VALIDATE_FILE'];
const Queries: readonly string[] = [];
const SuccessEvents = ['FILE_VALIDATED'];
const FailureEvents = ['UNABLE_TO_VALIDATE_FILE'];

export const Messages = [...Commands, ...Queries, ...SuccessEvents, ...FailureEvents];

//
// Service and dependencies
//
export type Service = dt.Service;
export type Dependencies = dt.Dependencies;

//
// Message data types
//
export type ValidatedFile = t.OutputOf<typeof dt.ValidatedFile>;
//export type UnvalidatedFile = t.OutputOf<typeof dt.ParsedFile>;

//
// Commands
//
export type ValidateFile = {
  readonly name: 'Validator.VALIDATE_FILE';
  readonly data: ParsedFile; // TODO: Switch to a specialized UnvalidatedFile type? Custom transformer codec?
};

//
// Success Events
//
export type FileValidated = {
  readonly name: 'Validator.FILE_VALIDATED';
  readonly data: ValidatedFile;
};

//
// Failure Events
//

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
