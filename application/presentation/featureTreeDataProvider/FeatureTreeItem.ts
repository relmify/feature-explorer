import { Uri, TreeItem, TreeItemCollapsibleState, Command } from 'vscode';

import { Item as SummaryItem, FileItemType, FileContentItemType, isFileItem } from '../../application/summary';

const iconPath = 'resources';
/* eslint-disable-next-line functional/prefer-readonly-type */
const itemTypeToIconPath = (itemType: FileItemType | FileContentItemType): { dark: string; light: string } => {
  const darkIconPath = `${iconPath}/dark/${itemType.toLowerCase()}.svg`;
  const lightIconPath = `${iconPath}/light/${itemType.toLowerCase()}.svg`;
  return { dark: `${darkIconPath}`, light: `${lightIconPath}` };
};

export type SummaryTreeItem = SummaryItem & TreeItem;

/** Creates a new FeatureTreeItem that combines a FeatureItem with vscode TreeItem properties */
export const createSummaryTreeItem = (
  uriParser: (uriString: string) => Uri,
  item: SummaryItem,
  collapsibleState: TreeItemCollapsibleState,
  command?: Command,
): SummaryTreeItem => {
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
        contextValue: 'summaryTreeFileItem',
        iconPath: itemTypeToIconPath(item.itemType),
      }
    : {
        contextValue: 'summaryTreeFileContentItem',
      };
  return { ...itemProperties, ...commonProperties, ...specializedProperties };
};

// /** SummaryTreeItem Lenses */
// export const itemId = Lens.fromProp<SummaryTreeItem>()('itemId');
// export const itemName = Lens.fromProp<SummaryTreeItem>()('itemName');
// export const itemDescription = Lens.fromProp<SummaryTreeItem>()('itemDescription');
// export const itemParent = Lens.fromProp<SummaryTreeItem>()('itemParent');
// export const itemType = Lens.fromProp<SummaryTreeItem>()('itemType');

// /** FileItem Lenses */
// export const fileItemId = Lens.fromProp<FileItem>()('fileItemId');
// export const fileItemPath = Lens.fromProp<FileItem>()('fileItemPath');

// /** FileContentItem Lenses */
// export const contentIndex = Lens.fromProp<FileContentItem>()('contentIndex');
// export const contentLocation = Lens.fromProp<FileContentItem>()('contentLocation');
