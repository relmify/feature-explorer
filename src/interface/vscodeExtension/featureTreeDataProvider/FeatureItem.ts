import { Lens } from 'Monocle-ts';
// import { NonEmptyString } from '../../../utils/string';
import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString';
import { ItemLocation } from './featureItem/Location';

// Types

export enum FileItemType {
  FeatureDirectory = 'FEATURE_DIRECTORY',
  FeatureFile = 'FEATURE_FILE',
}
export enum FileContentItemType {
  Feature = 'FEATURE',
  Scenario = 'SCENARIO',
  ScenarioOutline = 'SCENARIO_OUTLINE',
  Examples = 'EXAMPLES',
  Rule = 'RULE',
}
export const ItemType = { ...FileItemType, ...FileContentItemType };
export type ItemType = FileItemType | FileContentItemType;

export type ItemID = NonEmptyString;
export type ItemName = string;
export type ItemDescription = string;
export type ItemPath = NonEmptyString;

type BaseItem = {
  readonly itemId: ItemID;
  readonly itemName: ItemName;
  readonly itemDescription: ItemDescription;
  readonly parent?: ItemID;
};

export type FileItem = BaseItem & {
  readonly itemType: FileItemType.FeatureDirectory | FileItemType.FeatureFile;
  readonly itemPath: ItemPath;
};
export type FileContentItem = BaseItem & {
  readonly itemType:
    | FileContentItemType.Feature
    | FileContentItemType.Rule
    | FileContentItemType.Scenario
    | FileContentItemType.ScenarioOutline
    | FileContentItemType.Examples;
  readonly itemLocation: ItemLocation;
};

/**
 * @typedef FeatureItem The view model for directories, files, features, scenarios, scenario outlines,
 * examples, and rules
 */
export type FeatureItem = FileItem | FileContentItem;

/**
 * Lenses to get and set properties stored in a FeatureItem.
 *
 * Lenses suffixed with `asGetter()` do not provide a `set()` method.
 *
 * @example
 * const itemId: ItemId = itemId.get(featureItemToGetFrom);
 *
 * @example
 * const newFeatureItem: FeatureItem = itemName.set('New item name')(originalFeatureItem);
 */
export const featureItemGetter = Lens.fromProps<FeatureItem>()([
  'itemId',
  'itemType',
  'itemName',
  'itemDescription',
  'parent',
]).asGetter();
export const featureItemSetter = Lens.fromProps<FeatureItem>()(['itemName', 'itemDescription', 'parent']).asSetter();

export const itemId = Lens.fromProp<FeatureItem>()('itemId').asGetter();
export const itemType = Lens.fromProp<FeatureItem>()('itemType').asGetter();
export const itemName = Lens.fromProp<FeatureItem>()('itemName');
export const itemDescription = Lens.fromProp<FeatureItem>()('itemDescription');
export const parent = Lens.fromProp<FeatureItem>()('parent');

export const fileItemPath = Lens.fromProp<FileItem>()('itemPath');
export const fileContentItemGetter = Lens.fromProps<FileContentItem>()([
  'itemId',
  'itemType',
  'itemName',
  'itemDescription',
  'parent',
  'itemLocation',
]).asGetter();
export const fileContentItemSetter = Lens.fromProps<FileContentItem>()([
  'itemName',
  'itemDescription',
  'parent',
  'itemLocation',
]).asSetter();

export const itemLocation = Lens.fromProp<FileContentItem>()('itemLocation');
export const itemRelativeLocation = Lens.fromPath<FileContentItem>()(['itemLocation', 'relativeLocation']);
export const itemAbsoluteLocation = Lens.fromPath<FileContentItem>()(['itemLocation', 'absoluteLocation']);

/**
 * Creates a new FileItem
 */
export const fileItemOf = (
  itemType: FileItemType,
  itemID: ItemID,
  itemName: ItemName,
  itemDescription: ItemDescription,
  itemPath: ItemPath,
  parent?: ItemID,
): FileItem => {
  return {
    itemType: itemType,
    itemId: itemID,
    itemName: itemName,
    itemDescription: itemDescription,
    itemPath: itemPath,
    parent: parent,
  };
};

/**
 * Creates a new FileContentItem
 */
export const fileContentItemOf = (
  itemType: FileContentItemType,
  itemID: ItemID,
  itemName: ItemName,
  itemDescription: ItemDescription,
  parent: ItemID,
  itemLocation: ItemLocation,
): FileContentItem => {
  return {
    itemType: itemType,
    itemId: itemID,
    itemName: itemName,
    itemDescription: itemDescription,
    parent: parent,
    itemLocation: itemLocation,
  };
};

export const isFileContentItem = (featureItem: FeatureItem): featureItem is FileContentItem => {
  return featureItem.itemType in FileContentItemType;
};

export const isFileItem = (featureItem: FeatureItem): featureItem is FileItem => {
  return featureItem.itemType in FileItemType;
};
