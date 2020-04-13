/**
 * @packageDocumentation
 * Represents an item within a feature file
 */
import * as t from 'io-ts';
import { Either } from 'fp-ts/lib/Either';
import { Lens } from 'Monocle-ts';
import { FileContentItemTypes, ItemType, ItemTypeBrand } from './ItemType';
import { ItemId, ItemName, ItemDescription, ItemParent } from './Item';
import { ContentLocation } from './ContentLocation';
import { NonNegativeInteger } from '../../common/types';

export type FileContentItemTypeBrand = { readonly FileContentItemType: unique symbol };
/**
 * FileContentItemType represents types of feature file items that may appear in the summary.
 * For example: FEATURE, SCENARIO, SCENARIO_OUTLINE, ...
 */
const FileContentItemType = t.brand(
  ItemType,
  (s): s is t.Branded<string, ItemTypeBrand & FileContentItemTypeBrand> =>
    typeof s === 'string' && FileContentItemTypes.includes(s),
  'FileContentItemType',
);
type FileContentItemType = t.TypeOf<typeof FileContentItemType>;
export { FileContentItemType };

// FileContentItem
const FileContentItem = t.readonly(
  t.type(
    {
      itemId: ItemId,
      itemName: ItemName,
      itemDescription: ItemDescription,
      itemParent: ItemParent,
      itemType: FileContentItemType,
      contentIndex: NonNegativeInteger,
      contentLocation: ContentLocation,
    },
    'FileContentItem',
  ),
);
type FileContentItem = t.TypeOf<typeof FileContentItem>;
export { FileContentItem };
export type FileContentItemDTO = ReturnType<typeof FileContentItem.encode>;

export const createFileContentItem = (data: FileContentItemDTO): Either<t.Errors, FileContentItem> => {
  return FileContentItem.decode(data);
};

/**
 * Lenses for getting and setting FileItem properties
 */
export const fileContentItemGetter = Lens.fromProps<FileContentItem>()([
  'itemId',
  'itemType',
  'itemName',
  'itemDescription',
  'itemParent',
  'contentIndex',
  'contentLocation',
]).asGetter();
export const fileContentItemSetter = Lens.fromProps<FileContentItem>()([
  'itemName',
  'itemDescription',
  'itemParent',
  'contentIndex',
  'contentLocation',
]).asSetter();
export const contentLocation = Lens.fromProp<FileContentItem>()('contentLocation');
export const contentIndex = Lens.fromProp<FileContentItem>()('contentIndex');
