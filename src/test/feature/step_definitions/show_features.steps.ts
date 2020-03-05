import { binding, given, then, when } from 'cucumber-tsflow';
import { expect } from 'chai';

// map file description to file path
// interface FileMap {
//   [description: string]: string;
// }

// const FEATURE_FILE_EXTENSION = '.feature';
// const AST_FILE_EXTENSION = '.ast.ndjson';

// const GOOD_FEATURES_PATH_PREFIX = 'src/test/test_data/features/good/';
// const GOOD_FEATURES: FileMap = {
//   'with background': 'background',
//   'with complex background': 'complex_background',
//   'with data tables': 'datatables',
//   'with descriptions': 'descriptions'
// };

// const WARNING_FEATURES_PATH_PREFIX = 'src/test/test_data/features/warning/';
// const WARNING_FEATURES: FileMap = {
//   'with no content': 'empty',
//   'with only a language comment': 'i18n_no',
//   'with an incomplete background': 'incomplete_background_1'
// };

// const ERROR_FEATURES_PATH_PREFIX = 'src/test/test_data/features/error/';
// const ERROR_FEATURES: FileMap = {
//   'with non-gherkin content': 'not_gherkin',
//   'with a single parser error': 'single_parser_error',
//   'with multiple parser errors': 'multiple_parser_errors'
// };

// @binding()
// export class ShowFeaturesSteps {
//   private featureFileName: string = '';
//   private featureFilePath: string = '';
//   private astFilePath: string = '';
//   private parsedFiles: Array<ValidatedFeatureFile> = [];
//   private shouldBeValid: boolean = true;
//   private shouldBeComplete: boolean = true;

//   //#region Given
//   @given(/^a feature file (.*) that contains valid and complete Gherkin$/)
//   public givenFileWithValidAndCompleteGherkin(fileDescription: string): void {
//     this.featureFileName = GOOD_FEATURES[fileDescription] + FEATURE_FILE_EXTENSION;
//     this.featureFilePath = GOOD_FEATURES_PATH_PREFIX + this.featureFileName;
//     this.astFilePath = this.featureFilePath + AST_FILE_EXTENSION;
//     this.shouldBeValid = true;
//     this.shouldBeComplete = true;
//   }

//   @given(/^a feature file (.*) that contains valid but incomplete Gherkin$/)
//   public givenFileWithValidAndIncompleteGherkin(fileDescription: string): void {
//     this.featureFileName = WARNING_FEATURES[fileDescription] + FEATURE_FILE_EXTENSION;
//     this.featureFilePath = WARNING_FEATURES_PATH_PREFIX + this.featureFileName;
//     this.astFilePath = this.featureFilePath + AST_FILE_EXTENSION;
//     this.shouldBeValid = true;
//     this.shouldBeComplete = false;
//   }

//   @given(/^a feature file (.*) that contains invalid unparseable Gherkin$/)
//   public givenFileWithInvalidGherkin(fileDescription: string): void {
//     this.featureFileName = ERROR_FEATURES[fileDescription] + FEATURE_FILE_EXTENSION;
//     this.featureFilePath = ERROR_FEATURES_PATH_PREFIX + this.featureFileName;
//     this.astFilePath = this.featureFilePath + AST_FILE_EXTENSION;
//     this.shouldBeValid = false;
//     this.shouldBeValid = true;
//   }
//   //#endregion

//   //#region When
//   @when(/^the file information is displayed$/)
//   public async whenFileInfoIsDisplayed(): Promise<void> {
//     let featureFilePaths: Array<string> = [this.featureFilePath];
//     let fileRepository = FileRepository.getInstance();
//     let featureFiles = FeatureFilesService.getInstance(fileRepository);
//     featureFiles.setRoot('.');
//     await featureFiles.refresh();
//     this.parsedFiles = featureFiles.getFeatureFiles();
//   }
//   //#endregion

//   //#region Then
//   @then(/^the feature file name will be present$/)
//   public featureFileNamePresent() {
//     expect(this.parsedFiles.length).to.equal(1);

//     let featureFile: ValidatedFeatureFile = this.parsedFiles[0].featureFile;

//     let uriString = featureFile.uri;
//     let fileName = getFileNameFromUri(uriString);

//     expect(fileName).to.equal(this.featureFileName);
//   }

//   @then(/^the feature name will be shown as (.*)$/)
//   public featureNameShownAs(nameOption: string) {
//     expect(this.parsedFiles.length).to.equal(1);

//     let featureFile: ValidatedFeatureFile = this.parsedFiles[0];

//     if (nameOption === 'the file name') {
//       let uriString = featureFile.uri;
//       let fileName = getFileNameFromUri(uriString);

//       if (featureFile.baseFeature.isValid && featureFile.feature.feature) {
//         expect(fileName).to.equal(this.featureFileName);
//       }
//       return 'pending';
//     } else if (nameOption === 'the feature name from the file contents') {
//       return 'pending';
//     } else {
//       return 'pending';
//     }
//   }

//   @then(/warning information will not be present/)
//   public warningInfoNotPresent() {
//     return 'pending';
//   }

//   @then(/error information will not be present/)
//   public errorInfoNotPresent() {
//     return 'pending';
//   }

//   @then(/warning information will be present/)
//   public warningInfoPresent() {
//     return 'pending';
//   }

//   @then(/error information will be present/)
//   public errorInfoPresent() {
//     return 'pending';
//   }
//   //#endregion
// }

// //#region utility functions
// function getFileNameFromUri(urlString: string): string {
//   let urlObject = url.parse(urlString, true);
//   let filePath = urlObject.path ? urlObject.path : '';
//   return path.basename(filePath);
// }

// //#endregion
