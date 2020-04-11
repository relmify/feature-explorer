Feature: Completion Violation Rules
      Rules that indicate possibly incomplete feature files.
      All of these rules are set to 'warn' by default.

      Background:
            Given the following convention violation rules:
                  | Rule                               | Properties |
                  | featureRequired                    | -          |
                  | featureNameRequired                | -          |
                  | scenarioRequired                   | -          |
                  | scenarioNameRequired               | -          |
                  | scenarioGivenWhenThenStepsRequired | -          |
                  | examplesRequired                   | -          |
                  | exampleElementsMustBeMapped        | -          |
                  | examplesTableMustContainExamples   | -          |
                  | noEmptyCellsInTables               | -          |
                  | noBlankSteps                       | -          |
                  | noEmptyDocStrings                  | -          |


      Scenario: All completion violation rules default to "warn"

      Scenario: All completion violation rules can be defaulted to "off"

      Scenario: All completion violation rules can be defaulted to "error"

      Scenario: Individual completion violation rules settings can be overridden