import { Uri, TreeItem, TreeItemCollapsibleState, Command } from 'vscode';
import { Lens } from 'monocle-ts';
import { FeatureItem } from './FeatureItem';
import { FileItem, FileItemType } from './FileItem';
import { FileContentItem, FileContentItemType } from './FileContentItem';

const iconPath = 'resources';
/* eslint-disable-next-line functional/prefer-readonly-type */
const itemTypeToIconPath = (itemType: FileItemType | FileContentItemType): { dark: string; light: string } => {
  const darkIconPath = `${iconPath}/dark/${itemType.toLowerCase()}.svg`;
  const lightIconPath = `${iconPath}/light/${itemType.toLowerCase()}.svg`;
  return { dark: `${darkIconPath}`, light: `${lightIconPath}` };
};

export type FeatureTreeItem = FeatureItem & TreeItem;

/** Creates a new FeatureTreeItem that combines a FeatureItem with vscode TreeItem properties */
export const createFeatureTreeItem = (
  uriParser: (uriString: string) => Uri,
  item: FeatureItem,
  collapsibleState: TreeItemCollapsibleState,
  command?: Command,
): FeatureTreeItem => {
  const itemProperties = { ...item };
  const commonProperties = {
    label: item.itemName,
    collapsibleState: collapsibleState,
    command: command,
  };
  const specializedProperties = FileItem.is(item)
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

/** FeatureTreeItem Lenses */
export const itemId = Lens.fromProp<FeatureTreeItem>()('itemId');
export const itemName = Lens.fromProp<FeatureTreeItem>()('itemName');
export const itemDescription = Lens.fromProp<FeatureTreeItem>()('itemDescription');
export const itemParent = Lens.fromProp<FeatureTreeItem>()('itemParent');
export const itemType = Lens.fromProp<FeatureTreeItem>()('itemType');

/** FileItem Lenses */
export const fileItemId = Lens.fromProp<FileItem>()('fileItemId');
export const fileItemPath = Lens.fromProp<FileItem>()('fileItemPath');

/** FileContentItem Lenses */
export const contentIndex = Lens.fromProp<FileContentItem>()('contentIndex');
export const contentLocation = Lens.fromProp<FileContentItem>()('contentLocation');
