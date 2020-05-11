Feature: Features root directory
  The features root directory configuration setting controls what files and
  directories are watched and displayed in feature explorer. Feature explorer
  will use the featuresRootDirectory configuration setting, or
  ${workspaceRoot}/features otherwise.

  Match pattern will look like this if ${featuresRootDirectory} is provided:
  '${featuresRootDirectory}/**/*.feature'

  Match pattern will look like this if ${featuresRootDirectory} is not provided:
  '${workspaceRoot}/features/**/*.feature'

  Scenario: A featuresRootDirectory is configured
  All feature files anywhere under the featuresRootDirectory will be displayed

  Scenario: No featuresRootDirectory is configured
    Any feature files under `${workspaceRoot}/features` will be displayed

    Given The user has not configured a features root directory
    And a features directory exists at the top level of the workspace folder
    When the feature explorer view is displayed
    Then feature files anywhere under the features folder will be displayed
    And feature files under other directories will not be displayed

  Scenario: User changes the root directory setting in configuration
  View refreshes to show the newly selected directories and files

  Scenario: User right-clicks on a directory and selects "Set as features root"
    Workspace configuration is updated and the view refreshes to show the
    newly selected directories and files

    Given Start to type your Given step here

