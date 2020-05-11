Feature: Possible Error Rules
  Rules that indicate a possible error.
  All of these rules are set to 'warn' by default.

  Background:
    Given the following potential error rules:
      | Rule                      | Properties |
      | noThenInBackground        | -          |
      | onlyOneWhenPerScenario    | -          |
      | enforceGivenWhenThenOrder | -          |
      | noDuplicateTags           | -          |

  Scenario: All possible error rules default to "warn"

  Scenario: All possible error rules can be defaulted to "off"

  Scenario: All possible error rules can be defaulted to "error"

  Scenario: Individual possible error rules settings can be overridden