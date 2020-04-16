/**
 * The GherkinParser function provided by Cucumber returns the Gherkin AST representation of a feature file.
 * The Gherkin AST for a feature file consists of either a GherkinDocument (when parsing is successful)
 * or an array of GherkinError objects (when the file cannot be successfully parsed). The Parser service
 * reads in and validates the received Gherkin AST and transforms it to the domain representation of a
 * ParsedFile.
 * @PackageDocumentation
 */
import * as t from 'io-ts';

//
// Gherkin AST
//
export const GherkinLocation = t.type({
  column: t.union([t.number, t.undefined]),
  line: t.number,
});

export const GherkinComment = t.type({
  location: GherkinLocation,
  text: t.string,
});

export const GherkinTag = t.type({
  location: GherkinLocation,
  name: t.union([t.string, t.undefined]),
});

export const GherkinTableCell = t.type({
  location: GherkinLocation,
  value: t.union([t.string, t.undefined]),
});

export const GherkinTableRow = t.type({
  location: t.union([GherkinLocation, t.undefined]),
  cells: t.readonlyArray(GherkinTableCell),
});

export const GherkinDataTable = t.type({
  location: GherkinLocation,
  rows: t.readonlyArray(GherkinTableRow),
});

export const GherkinDocString = t.type({
  location: GherkinLocation,
  content: t.string,
  delimiter: t.string,
});

export const GherkinStep = t.type({
  location: GherkinLocation,
  keyword: t.string,
  text: t.string,
  dataTable: t.union([GherkinDataTable, t.undefined]),
  docString: t.union([GherkinDocString, t.undefined]),
  id: t.union([t.string, t.undefined]),
});

export const GherkinBackground = t.type({
  background: t.type({
    location: GherkinLocation,
    keyword: t.string,
    name: t.union([t.string, t.undefined]),
    description: t.union([t.string, t.undefined]),
    steps: t.union([t.readonlyArray(GherkinStep), t.undefined]),
  }),
});

export const GherkinExamples = t.type({
  location: GherkinLocation,
  tags: t.union([t.readonlyArray(GherkinTag), t.undefined]),
  keyword: t.string,
  name: t.union([t.string, t.undefined]),
  tableHeader: t.union([GherkinTableRow, t.undefined]),
  tableBody: t.union([t.readonlyArray(GherkinTableRow), t.undefined]),
});

export const GherkinScenario = t.type({
  scenario: t.union([
    t.type({
      location: GherkinLocation,
      tags: t.union([t.array(GherkinTag), t.undefined]),
      keyword: t.string,
      name: t.union([t.string, t.undefined]),
      description: t.union([t.string, t.undefined]),
      steps: t.union([t.readonlyArray(GherkinStep), t.undefined]),
      examples: t.union([t.readonlyArray(GherkinExamples), t.undefined]),
      id: t.union([t.string, t.undefined]),
    }),
    t.undefined,
  ]),
});

export const GherkinRule = t.type({
  rule: t.type({
    location: GherkinLocation,
    keyword: t.string,
    name: t.union([t.string, t.undefined]),
    description: t.union([t.string, t.undefined]),
    children: t.union([t.readonlyArray(t.union([GherkinBackground, GherkinScenario])), t.undefined]),
  }),
});

export const GherkinFeature = t.type({
  location: GherkinLocation,
  tags: t.union([t.readonlyArray(GherkinTag), t.undefined]),
  language: t.string,
  keyword: t.string,
  name: t.union([t.string, t.undefined]),
  description: t.union([t.string, t.undefined]),
  children: t.union([t.readonlyArray(t.union([GherkinRule, GherkinBackground, GherkinScenario])), t.undefined]),
});

export const GherkinDocument = t.type({
  gherkinDocument: t.type({
    uri: t.string,
    comments: t.union([t.array(GherkinComment), t.undefined]),
    feature: t.union([GherkinFeature, t.undefined]),
  }),
});

export const GherkinSource = t.type({
  location: GherkinLocation,
  uri: t.string,
});

export const GherkinAttachment = t.type({
  source: GherkinSource,
  data: t.union([t.string, t.undefined]),
});

export const GherkinError = t.type({
  attachment: GherkinAttachment,
});

//
// Parsed File Types
//
export const FileId = t.string;
export const FilePath = t.string;
export const FileName = t.string;
export const ErrorMessage = t.string;

// Error Kind
export const ErrorKinds = ['FileDoesNotExist', 'NotAFile', 'GherkinParserError'];
export type ErrorKindBrand = { readonly ErrorKind: unique symbol };
const ErrorKind = t.brand(
  t.string,
  (str): str is t.Branded<string, ErrorKindBrand> => ErrorKinds.includes(str),
  'ErrorKind',
);
type ErrorKind = t.TypeOf<typeof ErrorKind>;
export { ErrorKind };

// Parser Error
export const ParserError = t.type({
  filePath: FilePath,
  errorKind: ErrorKind,
  errorMessage: ErrorMessage,
});

// Parsed Content
export const ParsedContent = t.type({
  feature: t.union([GherkinFeature, t.undefined]),
  comments: t.union([t.readonlyArray(GherkinComment), t.undefined]),
});

// Parsed File
const ParsedFile = t.type({
  fileId: FileId,
  filePath: FilePath,
  fileName: FileName,
  fileContent: t.union([t.array(ParserError), ParsedContent]),
});
type ParsedFile = t.TypeOf<typeof ParsedFile>;
export { ParsedFile };
export type ParsedFileDto = ReturnType<typeof ParsedFile.encode>;
