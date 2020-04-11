import { Lens } from 'monocle-ts';
import { FileItem } from './FileItem';
import { FileContentItem } from './FileContentItem';

export type FeatureItem = FileItem | FileContentItem;

/** FeatureItem Lenses */
export const itemId = Lens.fromProp<FeatureItem>()('itemId');
export const itemName = Lens.fromProp<FeatureItem>()('itemName');
export const itemDescription = Lens.fromProp<FeatureItem>()('itemDescription');
export const itemParent = Lens.fromProp<FeatureItem>()('itemParent');
export const itemType = Lens.fromProp<FeatureItem>()('itemType');

/** FileItem Lenses */
export const fileItemId = Lens.fromProp<FileItem>()('fileItemId');
export const fileItemPath = Lens.fromProp<FileItem>()('fileItemPath');

/** FileContentItem Lenses */
export const contentIndex = Lens.fromProp<FileContentItem>()('contentIndex');
export const contentLocation = Lens.fromProp<FileContentItem>()('contentLocation');
