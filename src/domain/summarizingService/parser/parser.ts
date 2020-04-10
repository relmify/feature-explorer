/**
 * @packageDocumentation
 * The Parser service parses the Gherkin in .feature files. If a file cannot be successfully
 * parsed, one or more error objects will be generated. If a file can be successfully parsed
 * the data is made available to services listening for `FileParsed` events
 */

// Output Success Events

type FileId = string;
type FilePath = string;
type FileName = string;

export type ParsedFile = {
  readonly fileId: FileId;
  readonly filePath: FilePath;
  readonly fileName: FileName;
};

export type FeatureDataItem = {
  readonly type: string;
  readonly id: string;
  readonly name: string;
  readonly filePath: string;
  readonly parent?: FeatureDataItem;
  readonly children: readonly FeatureDataItem[];
};

// Output Error Events

// Success Events

// FileParsed(unvalidatedFeature)

// Error Events

// FileParsingError(file, message) {
//   FileDoesNotExist(file, message)
//   NotAFile(file, message)
//   NotGherkin(file, message)
//   InvalidGherkin(file, message)
// }
