Feature: Show Tags

Show tags on features and scenarios

Scenario: Feature has tags
Given a feature file with one or more tags at the feature level
When the feature is displayed in tree view
Then all of the feature level tags will be displayed too

Scenario: Scenario has tags
Given a feature file with one or more tags at the scenario level
And the feature file has zero or more tags at the feature level
When the scenario is displayed in tree view
Then all of the scenario level tags will be displayed
And all of the feature level tags will be displayed

