Feature: Convention Violation Rules
  Rules that indicate possible convention violations.
  All of these rules are off by default.

  Background:
    Given the following convention violation rules:
      | Rule                                 | Properties                                           |
      | featureMustHaveDescription           | -                                                    |
      | scenarioMustHaveDescription          | -                                                    |
      | noTagsOnExampleTables                | -                                                    |
      | noDuplicateGivenWhenThen             | -                                                    |
      | noPeriodsEndingLines                 | -                                                    |
      | exampleTableHeadersUseLowerKebabCase | -                                                    |
      | dataTableHeadersUseUpperCamelCase    | -                                                    |
      | badPhraseInGivenWhenThen             | -                                                    |
      | featureNamesMustBeUnique             | -                                                    |
      | scenarioNamesMustBeUnique            | -                                                    |
      | examplesSectionsMustHaveNames        | evenIfScenarioOutlineHasOneExamplesSection (boolean) |


  Scenario: All convention violation rules default to "off"

  Scenario: All convention violation rules can be defaulted to "warn"

  Scenario: All convention violation rules can be defaulted to "error"

  Scenario: Individual convention violation rules settings can be overridden


