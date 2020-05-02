import { ContractViolation } from '../../../framework/eventBus';
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
const FailureEvents = ['FILE_VALIDATION_FAILED'];

export const Events = [...Commands, ...Queries, ...SuccessEvents, ...FailureEvents];

//
// Service and dependencies
//
export type Service = dt.Service;
export type Dependencies = dt.Dependencies;

//
// Event data types
//
//export type UnvalidatedFile = t.OutputOf<typeof dt.ParsedFile>;
export type ValidatedFile = t.OutputOf<typeof dt.ValidatedFile>;

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
// Custom contract violation error type
//
// eslint-disable-next-line functional/no-class
export class ValidatorContractViolation extends ContractViolation {
  constructor(message: string) {
    // eslint-disable-next-line functional/no-expression-statement
    super(ServiceName, message);
  }
}
