import { NonEmptyString } from '../../../common/types';

export const ValidatorEventTypes = ['FILES_VALIDATED'];

export const ContentTypes = ['FEATURE', 'BACKGROUND', 'RULE', 'SCENARIO', 'SCENARIO_OUTLINE', 'EXAMPLES', 'DATA_TABLE'];
export const WarningTypes = [
  'MISSING_NAME',
  'MISSING_DESCRIPTION',
  'MISSING_SCENARIOS',
  'MISSING_EXAMPLES',
  'INCOMPLETE_EXAMPLES',
  'MISSING_STEPS',
  'INCOMPLETE_DATA_TABLE',
];

export type ValidatorEventBrand = { readonly ValidatorEvent: unique symbol };
export type ValidatorEvent = ValidatorEventBrand & NonEmptyString;

export type ContentBrand = { readonly Content: unique symbol };
export type Content = ContentBrand & NonEmptyString;

export type WarningBrand = { readonly Warning: unique symbol };
export type Warning = WarningBrand & NonEmptyString;

export type ContentWarning = {
  readonly warningType: Warning;
  readonly warningString: NonEmptyString;
};

export type LineNumberBrand = { readonly LineNumber: unique symbol };
export type ColumnNumberBrand = { readonly ColumnNumber: unique symbol };
export type LineNumber = number & LineNumberBrand;
export type ColumnNumber = number & ColumnNumberBrand;

export type ContentLocation = {
  readonly line: LineNumber;
  readonly column: ColumnNumber;
};

export type ContentItem = {
  readonly type: Content;
  readonly location: ContentLocation;
  readonly parentLocation?: ContentLocation;
  readonly name?: NonEmptyString;
  readonly tags?: readonly NonEmptyString[];
  readonly warnings?: readonly ContentWarning[];
};

export type ValidatedFile = {
  readonly fileID: NonEmptyString;
  readonly fileName: NonEmptyString;
  readonly filePath: NonEmptyString;
  readonly fileErrors: readonly NonEmptyString[];
  readonly contentItems?: readonly ContentItem[];
};

export type FilesValidatedEvent = {
  readonly eventType: ValidatorEvent;
} & readonly ValidatedFile[];

/**
 * Output - Error Events
 */
export enum ValidatorErrorsEventType {
  InputValidationErrors = 'INPUT_VALIDATION_ERRORS',
}

// Not extending Error... leave that up to the error handler
export type ValidationError = {
  readonly type: 'VALIDATION_ERROR';
};

export type InputValidationErrorEvent = {
  readonly eventType: ValidatorErrorsEventType.InputValidationErrors;
} & readonly ValidationError[];
