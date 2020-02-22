# feature-explorer README

Feature Explorer provides a smart outline view of  your gerkin features and scenarios.

## Features

Feature Explore reads the `.feature` files in your workspace and shows you an outline view of their contents. Feature explorer makes it easy for you to jump to any feature, rule, scenario, or scenario outline.

Feature explorer also lets you filter the outline view to focus in on the features and scenarios that matter to you.

### Setting a feature directory

By default, feature explorer monitors all `.feature` files in the active workspace, but you can narrow things down by choosing a sub-directory to monitor instead.

### Errors and Warnings

Feature Explorer performs some basic validation on your feature files. The first level of validation checks that the feature file can be parsed by the cucumber gherkin parser. Files that can't be parsed are flagged with errors.

The second stage of validation checks for things like missing feature or scenario names, features that don't have any scenarios at all, scenarios that don't contain any steps, and scenario outlines that don't contain any examples. The idea is to help feature authors and other stakeholders see at a glance which features are just placeholders and still need work.

You can filter the explorer view to show or hide feature files with errors, and to show or hide features and scenarios with warnings.

## Tags

Features, scenarios, scenario outlines, and example tables can be tagged in your feature files. Many teams use tags to group features and scenarios into test suites. Tags at the feature level are automatically inherited by the scenarios that are part of that feature. Similarly, tags at the scenario outline level are inherited by the examples.

Tags are displayed in feature explorer, and you can filter your view to see only features and scenarios that match or exclude tags that you select. For example, you can narrow down your view to see only features and scenarios tagged `@this-sprint`. Or you can filter out all of the features and scenarios that are tagged `@future`.

## Extension Settings

* Default Feature Directory: You can specify a directory relative to your workspace root directory. For example /features . When left blank (the default) feature explorer will search for feature files starting at your workspace root. If your workspace doesn't contain the specified directory Feature Explorer will use the workspace root.
* Automatic update: You can change the frequency of automatic updates or turn off automatic updates completely if you want to manually control when the outline view is refreshed.  

## Known Issues

* None

## Release Notes

See [Changelog](./CHANGELOG.md)
