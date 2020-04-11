/**
 * @packageDocumentation
 * Represents a file or a directory
 */
import * as t from 'io-ts';
import { Either } from 'fp-ts/lib/Either';
import { NonEmptyString } from '../../common/types';
import { Lens } from 'Monocle-ts';
import { ItemId, ItemName, ItemDescription, ItemParent, ItemData } from './Item';
import { FileItemTypes } from './ItemType';

/** FileItemPath -- Represents the file system path of the file item */
const FileItemPath = NonEmptyString;
type FileItemPath = t.TypeOf<typeof FileItemPath>;
export { FileItemPath };

export type FileItemTypeBrand = { readonly FileItemType: unique symbol };
/** FileItemType -- Indicates if a file item represents a File or a Directory */
const FileItemType = t.brand(
  t.string,
  (s): s is t.Branded<string, FileItemTypeBrand> => typeof s === 'string' && FileItemTypes.includes(s),
  'FileItemType',
);
type FileItemType = t.TypeOf<typeof FileItemType>;
export { FileItemType };

export type FileItemIdBrand = { readonly FileItemId: unique symbol };
/** FileItemId - A unique Id for a file or directory that doesn't change when the file is renamed */
const FileItemId = t.brand(
  t.string,
  (str): str is t.Branded<string, FileItemIdBrand> => typeof str === 'string',
  'FileItemId',
);
type FileItemId = t.TypeOf<typeof FileItemId>;
export { FileItemId };

/** FileItem */
const FileItem = t.readonly(
  t.type({
    itemId: ItemId,
    itemName: ItemName,
    itemDescription: ItemDescription,
    itemParent: ItemParent,
    itemType: FileItemType,
    fileItemId: FileItemId,
    fileItemPath: FileItemPath,
  }),
  'FileItem',
);
type FileItem = t.TypeOf<typeof FileItem>;

export type FileItemData = ItemData & {
  readonly fileItemId: string;
  readonly fileItemPath: string;
};
export { FileItem };

export const createFileItem = (fileItemData: FileItemData): Either<t.Errors, FileItem> => {
  return FileItem.decode(fileItemData);
};

/**
 * Lenses for getting and setting FileItem properties
 */
export const fileItemId = Lens.fromProp<FileItem>()('itemId').asGetter;
export const fileItemType = Lens.fromProp<FileItem>()('itemType').asGetter;
export const fileItemName = Lens.fromProp<FileItem>()('itemName');
export const fileItemDescription = Lens.fromProp<FileItem>()('itemDescription');
export const fileItemPath = Lens.fromProp<FileItem>()('fileItemPath');
export const fileItemParent = Lens.fromProp<FileItem>()('itemParent');
