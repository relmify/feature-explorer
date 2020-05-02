import { NonEmptyString } from '../../../common/types';

// TODO: Change all of these types into codecs

export type ValidatedFileDto = string;
export type InvalidFileDataDto = string;

export const RemarkTypes = [
  'MISSING_NAME',
  'MISSING_DESCRIPTION',
  'MISSING_SCENARIOS',
  'MISSING_EXAMPLES',
  'INCOMPLETE_EXAMPLES',
  'MISSING_STEPS',
  'INCOMPLETE_DATA_TABLE',
];

type RemarkType = string;
type RemarkLocation = { readonly line: number; readonly column?: number };
type RemarkMessage = string;

export type Remark = {
  readonly remarkType: RemarkType;
  readonly remarkLocation: RemarkLocation;
  readonly remarkMessage: RemarkMessage;
};

export const ContentTypes = ['FEATURE', 'BACKGROUND', 'RULE', 'SCENARIO', 'SCENARIO_OUTLINE', 'EXAMPLES', 'DATA_TABLE'];

type FileId = string;
type FilePath = string;
type FileName = string;
type ContentRemarkType = string;
type ContentAnomalyMessage = string;
type ContentAnomalyLocation = {
  readonly line: number;
  readonly column: number;
};

export type LineNumberBrand = { readonly LineNumber: unique symbol };
export type ColumnNumberBrand = { readonly ColumnNumber: unique symbol };
export type LineNumber = number & LineNumberBrand;
export type ColumnNumber = number & ColumnNumberBrand;

export type ContentLocation = {
  readonly line: LineNumber;
  readonly column?: ColumnNumber;
};

type ContentType = string;
type ContentName = string;
type Tag = { readonly name: string; readonly location: ContentLocation };

export type ContentItem = {
  readonly type: ContentType;
  readonly location: ContentLocation;
  readonly parentLocation?: ContentLocation;
  readonly name?: ContentName;
  readonly tags?: readonly Tag[];
  readonly remarks?: readonly Remark[];
};

export type ValidatedFile = {
  readonly fileID: NonEmptyString;
  readonly fileName: NonEmptyString;
  readonly filePath: NonEmptyString;
  readonly fileRemarks?: readonly Remark[];
  readonly contentItems?: readonly ContentItem[];
};
