Feature: Show Features

    Display features from selected files

    Scenario Outline: Show feature info for valid and complete feature files

        Given a feature file <with_description> that contains valid and complete Gherkin
        When the file information is displayed
        Then the feature file name will be present
        And the feature name will be shown as the feature name from the file contents
        And the feature name will be present
        And the file will be marked as valid
        And the file will be marked as complete

        Examples:
            | with_description        |
            | with background         |
            | with complex background |
            | with data tables        |
            | with descriptions       |

    Scenario Outline: Show feature info for valid but incomplete feature files with named features

        Given a feature file <with_description> that contains valid but incomplete Gherkin
        And file content that includes a valid feature name
        When the file information is displayed
        Then the feature file name will be present
        And the feature name will be shown as the feature name from the file contents
        And the file will be marked as valid
        And the file will be marked as incomplete
        And warning text will be available

        Examples:
            | with_description                        |
            | with no background, scenarios, or rules |
            | with an incomplete background           |

    Scenario Outline: Show feature info for valid but incomplete feature files without named features

        Given a feature file <with_description> that contains valid but incomplete Gherkin
        And file content that does not include a valid feature name
        When the file information is displayed
        Then the feature file name will be present
        And the feature name will be shown as the file name
        And the file will be marked as valid
        And the file will be marked as incomplete
        And warning text will be available

        Examples:
            | with_description             |
            | with no content              |
            | with only a language comment |
            | with a blank feature name    |

    Scenario Outline: Show feature info for invalid feature files

        Given a feature file <with_description> that contains invalid unparseable Gherkin
        When the file information is displayed
        Then the feature file name will be present
        And the feature name will be shown as the file name
        And the file will be marked as invalid
        And error text will be available

        Examples:
            | with_description            |
            | with non-gherkin content    |
            | with a single parser error  |
            | with multiple parser errors |
