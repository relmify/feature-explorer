import { TreeItem, Uri, TreeItemCollapsibleState, Command } from '../test/utils/vscodeInterface';
import { Lens } from 'monocle-ts';
import { FeatureItem, ItemType, FileItem, isFileItem } from './FeatureItem';

const iconPath = 'resources';
/* eslint-disable-next-line functional/prefer-readonly-type */
const itemTypeToIconPath = (itemType: ItemType): { dark: string; light: string } => {
  const darkIconPath = `${iconPath}/dark/${itemType.toLowerCase()}.svg`;
  const lightIconPath = `${iconPath}/light/${itemType.toLowerCase()}.svg`;
  return { dark: `${darkIconPath}`, light: `${lightIconPath}` };
};

/**
 * An item that combines the properties of {@link FeatureItem} and a vscode TreeItem
 *
 * @typedef FeatureTreeItem
 */
export type FeatureTreeItem = { readonly featureItem: FeatureItem } & TreeItem;

/**
 * Lens to get or set the FeatureItem stored in a FeatureTreeItem.
 *
 * @example
 * ```
 * const featureItem: FeatureItem = featureItem.get(featureTreeItemToGetFrom);
 * ```
 *
 * @example
 * ```
 * const newFeatureTreeItem: FeatureTreeItem = featureItem.set(newItem)(originalFeatureTreeItem);
 * ```
 */
export const featureItem = Lens.fromProp<FeatureTreeItem>()('featureItem');

/**
 * Creates a new FeatureTreeItem that combines a FeatureItem with vscode TreeItem properties
 */
export const featureTreeItemOf = (
  uriParser: (uriString: string) => Uri,
  featureItem: FeatureItem,
  collapsibleState: TreeItemCollapsibleState,
  command?: Command,
): FeatureTreeItem => {
  return isFileItem
    ? {
        featureItem: featureItem,
        resourceUri: uriParser((featureItem as FileItem).itemPath),
        label: featureItem.itemName,
        collapsibleState: collapsibleState,
        command: command,
        tooltip: (featureItem as FileItem).itemPath,
        contextValue: 'featureTreeFileItem',
        iconPath: itemTypeToIconPath(featureItem.itemType),
      }
    : {
        featureItem: featureItem,
        label: featureItem.itemName,
        collapsibleState: collapsibleState,
        command: command,
        contextValue: 'featureTreeFileContentItem',
        iconPath: itemTypeToIconPath(featureItem.itemType),
      };
};
