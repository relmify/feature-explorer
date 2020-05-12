/**
 * The GherkinParser function provided by Cucumber returns the Gherkin AST representation of a feature file.
 * The Gherkin AST for a feature file consists of either a GherkinDocument (when parsing is successful)
 * or an array of GherkinError objects (when the file cannot be successfully parsed). The Parser service
 * reads in and validates the received Gherkin AST and transforms it to the domain representation of a
 * ParsedFile.
 * @PackageDocumentation
 */
import * as t from 'io-ts';
import { BehaviorSubject } from 'rxjs';
import { EventBus } from '../../framework/eventBus';

//
// Constant Values
//
export const ParserFailureKinds = ['FileDoesNotExist', 'NotAFile', 'CommandNotImplemented'];

//
// Gherkin AST types
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
// Parser Types
//
export const FileId = t.string;
export type FileId = t.TypeOf<typeof FileId>;

export const FilePath = t.string;
export type FilePath = t.TypeOf<typeof FilePath>;

export const FileName = t.string;
export type FileName = t.TypeOf<typeof FileName>;

export const File = t.type({
  fileId: FileId,
  filePath: FilePath,
  fileName: FileName,
});
export type File = t.TypeOf<typeof File>;

export const ParsedContent = t.type({
  feature: t.union([GherkinFeature, t.undefined]),
  comments: t.union([t.readonlyArray(GherkinComment), t.undefined]),
});
export type ParsedContent = t.TypeOf<typeof ParsedContent>;

export const ParsingErrors = t.readonlyArray(GherkinError);
export type ParsingErrors = t.TypeOf<typeof ParsingErrors>;

export const ParsedFile = t.type({
  file: File,
  fileContent: t.union([ParsedContent, t.undefined]),
  parsingErrors: t.union([ParsingErrors, t.undefined]),
});
export type ParsedFile = t.TypeOf<typeof ParsedFile>;

//
// Service State
//

export type Dependencies = {
  readonly eventBus: EventBus;
};

export type State = {
  readonly dependencies: Dependencies | undefined;
};

const initialState: State = {
  dependencies: undefined,
};

export const Service = new BehaviorSubject<State>(initialState);
export type Service = typeof Service;
