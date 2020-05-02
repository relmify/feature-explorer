import * as t from 'io-ts';
import * as dt from './domainTypes';
import { ContractViolation } from '../../../framework/eventBus';

//
// Service and dependencies
//
export type Service = dt.Service;
export type Dependencies = dt.Dependencies;

//
// Event Data Types
//
export type FilePath = t.OutputOf<typeof dt.FilePath>;
export type ParsedFile = t.OutputOf<typeof dt.ParsedFile>;

//
// Commands
//
export type ParseFileCommand = {
  readonly name: 'Parser.PARSE_FILE';
  readonly data: FilePath;
};

//
// Success Events
//
export type FileParsedEvent = {
  readonly name: 'Parser.FILE_PARSED';
  readonly data: ParsedFile;
};
export type FileParsedWithErrorsEvent = {
  readonly name: 'Parser.FILE_PARSED_WITH_ERRORS';
  readonly data: ParsedFile;
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
export class ParserContractViolation extends ContractViolation {
  constructor(message: string) {
    // eslint-disable-next-line functional/no-expression-statement
    super(dt.ServiceName, message);
  }
}
