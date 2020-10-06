import * as dt from './domainTypes';
import { BehaviorSubject } from 'rxjs';
import equal = require('fast-deep-equal');
import { Uri, TreeItemCollapsibleState, Command } from 'vscode';
import { Item as FeatureSummaryItem, FileItemType, FileContentItemType, isFileItem } from '../../application/summary';

//
// Constant values
//
const iconPath = 'resources';

//
// Domain functions
//

/* eslint-disable-next-line functional/prefer-readonly-type */
const itemTypeToIconPath = (itemType: FileItemType | FileContentItemType): { dark: string; light: string } => {
  const darkIconPath = `${iconPath}/dark/${itemType.toLowerCase()}.svg`;
  const lightIconPath = `${iconPath}/light/${itemType.toLowerCase()}.svg`;
  return { dark: `${darkIconPath}`, light: `${lightIconPath}` };
};

/**
 * Creates a new FeatureTreeItem that combines a Feature Summary Item with vscode TreeItem
 * properties
 *
 * @param uriParser a function for parsing a URI string
 * @param item the feature summary item to be converted into a feature tree tiem
 * @param collapsibleState indicates whether the item should be displayed collapsed or expanded
 * @param command
 */
export const createFeatureTreeItem = (
  uriParser: (uriString: string) => Uri,
  item: FeatureSummaryItem,
  collapsibleState: TreeItemCollapsibleState,
  command?: Command,
): dt.FeatureTreeItem => {
  const itemProperties = { ...item };
  const commonProperties = {
    label: item.itemName,
    collapsibleState: collapsibleState,
    command: command,
  };
  const specializedProperties = isFileItem(item)
    ? {
        resourceUri: uriParser(item.fileItemPath),
        tooltip: item.fileItemPath,
        contextValue: 'featureTreeFileItem',
        iconPath: itemTypeToIconPath(item.itemType),
      }
    : {
        contextValue: 'featureTreeFileContentItem',
      };
  return { ...itemProperties, ...commonProperties, ...specializedProperties };
};

/**
 * Creates a new feature tree.
 *
 * @param directorySearchPatterns an array of strings that specify which directories should be
 * searched and excluded when searching for feature files to summarize. See
 * [globbing-patterns](https://github.com/sindresorhus/globby#globbing-patterns) documentation for
 * more information about valid patterns
 */
export const createFeatureTree = (
  rootDirectory: dt.RootDirectory,
  directorySearchPatterns: dt.DirectorySearchPatterns = ['*', '!**/node_modules'],
): dt.FeatureTree => {
  const data: dt.FeatureTreeData = {
    rootDirectory: rootDirectory,
    directorySearchPatterns: directorySearchPatterns,
    featureTreeItems: [],
  };
  const tree: dt.FeatureTree = new BehaviorSubject<dt.FeatureTreeData>(data);
  return tree;
};

export const getItemChildren = (
  featureTree: dt.FeatureTree,
  item?: FeatureSummaryItem,
): readonly FeatureSummaryItem[] => {
  return item
    ? (featureTree
        .getValue()
        .featureTreeItems.filter(currentItem => equal(currentItem.itemParent, item.itemId)) as ReadonlyArray<
        FeatureSummaryItem
      >)
    : (featureTree
        .getValue()
        .featureTreeItems.filter(currentItem => currentItem.itemParent === undefined) as ReadonlyArray<
        FeatureSummaryItem
      >);
};

export const getItemParent = (
  featureTree: dt.FeatureTree,
  item: FeatureSummaryItem,
): FeatureSummaryItem | undefined => {
  return featureTree.getValue().featureTreeItems.filter(currentItem => equal(currentItem.itemType, item.itemParent))[0];
};

export const getAllItems = (featureTree: dt.FeatureTree): readonly FeatureSummaryItem[] => {
  return featureTree.getValue().featureTreeItems;
};
