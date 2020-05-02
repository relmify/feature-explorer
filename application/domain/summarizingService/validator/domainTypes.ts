import { NonEmptyString, PositiveInteger } from '../../../common/types';
import { EventBus } from '../../../framework/eventBus';
import { BehaviorSubject } from 'rxjs';
import * as t from 'io-ts';

//
// Constant values
//
export const ServiceName = 'Validator';
export const Commands = ['VALIDATE_FILE'];
export const Queries = [];
export const SuccessEvents = ['FILE_VALIDATED'];
export const ErrorEvents = ['FILE_VALIDATION_FAILED'];
export const Events = [...Commands, ...Queries, ...SuccessEvents, ...ErrorEvents];
export const ContentTypes = ['FEATURE', 'BACKGROUND', 'RULE', 'SCENARIO', 'SCENARIO_OUTLINE', 'EXAMPLES', 'DATA_TABLE'];
export const RemarkTypes = [
  'MISSING_NAME',
  'MISSING_DESCRIPTION',
  'MISSING_SCENARIOS',
  'MISSING_EXAMPLES',
  'INCOMPLETE_EXAMPLES',
  'MISSING_STEPS',
  'INCOMPLETE_DATA_TABLE',
];

//
// Brands for branded types
//
type LineNumberBrand = { readonly LineNumber: unique symbol };
type ColumnNumberBrand = { readonly ColumnNumber: unique symbol };

//
// Domain types
//
const RemarkType = NonEmptyString;

const RemarkLocation = t.type({
  line: t.number,
  column: t.union([t.number, t.undefined]),
});

const RemarkMessage = NonEmptyString;

export const Remark = t.type({
  remarkType: RemarkType,
  remarkLocation: RemarkLocation,
  remarkMessage: RemarkMessage,
});
export type Remark = t.TypeOf<typeof Remark>;

const LineNumber = t.brand(
  PositiveInteger,
  (num): num is t.Branded<PositiveInteger, LineNumberBrand> => typeof num === 'number' && num >= 0,
  'LineNumber',
);
type LineNumber = t.TypeOf<typeof LineNumber>;

const ColumnNumber = t.brand(
  PositiveInteger,
  (num): num is t.Branded<PositiveInteger, ColumnNumberBrand> => typeof num === 'number' && num >= 0,
  'ColumnNumber',
);
type ColumnNumber = t.TypeOf<typeof ColumnNumber>;

const ContentLocation = t.type({
  line: LineNumber,
  column: t.union([ColumnNumber, t.undefined]),
});

const ContentType = NonEmptyString;
const ContentName = t.string;

const Tag = t.type({
  name: t.string,
  location: ContentLocation,
});

const ContentItem = t.type({
  type: ContentType,
  location: ContentLocation,
  parentLocation: t.union([ContentLocation, t.undefined]),
  name: t.union([ContentName, t.undefined]),
  tags: t.readonlyArray(Tag),
  remarks: t.readonlyArray(Remark),
});

const FileId = t.string;
type FileId = t.TypeOf<typeof FileId>;

const FilePath = t.string;
type FilePath = t.TypeOf<typeof FilePath>;

const FileName = t.string;
type FileName = t.TypeOf<typeof FileName>;

export const ValidatedFile = t.type({
  fileID: FileId,
  fileName: FileName,
  filePath: FilePath,
  fileRemarks: t.readonlyArray(Remark),
  contentItems: t.readonlyArray(ContentItem),
});
export type ValidatedFile = t.TypeOf<typeof ValidatedFile>;

//
// Service State
//
export type Dependencies = {
  readonly eventBus: EventBus;
  //readonly fileSystemWatcher: FileSystemWatcher;
};

export type State = {
  readonly dependencies: Dependencies | undefined;
  // readonly fileWatches: readonly FileWatch[];
};

const initialState: State = {
  dependencies: undefined,
};

export const Service = new BehaviorSubject<State>(initialState);
export type Service = typeof Service;
