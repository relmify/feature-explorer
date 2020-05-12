import * as t from 'io-ts';
import { BehaviorSubject } from 'rxjs';
import { MessageBus } from '../../framework/messageBus';
import { NonEmptyString, PositiveInteger, NonNegativeInteger } from '../../framework/types';

//
// Constant values
//
export const FileItemTypes = ['FEATURE_DIRECTORY', 'FEATURE_FILE'];
export const FileContentItemTypes = ['FEATURE', 'SCENARIO', 'SCENARIO_OUTLINE', 'EXAMPLES', 'RULE'];
export const ItemTypes = [...FileItemTypes, ...FileContentItemTypes];

//
// Brands for branded types
//
type ItemTypeBrand = { readonly ItemType: unique symbol };
type FileItemTypeBrand = { readonly FileItemType: unique symbol };
type FileItemIdBrand = { readonly FileItemId: unique symbol };
type FileContentItemTypeBrand = { readonly FileContentItemType: unique symbol };
type DirectorySearchPatternBrand = { readonly DirectorySearchPattern: unique symbol };

//
// Domain types
//
export const ItemType = t.brand(
  t.string,
  (s): s is t.Branded<string, ItemTypeBrand> => typeof s === 'string' && ItemTypes.includes(s),
  'ItemType',
);
export type ItemType = t.TypeOf<typeof ItemType>;

export const ItemId = NonEmptyString;
export type ItemId = t.TypeOf<typeof ItemId>;

export const ItemName = t.string;
export type ItemName = t.TypeOf<typeof ItemName>;

export const ItemDescription = t.string;
export type ItemDescription = t.TypeOf<typeof ItemDescription>;

export const ItemParent = t.union([ItemId, t.undefined], 'ItemParent');
export type ItemParent = t.TypeOf<typeof ItemDescription>;

export const Item = t.readonly(
  t.type({
    itemId: ItemId,
    itemType: ItemType,
    itemName: ItemName,
    itemDescription: ItemDescription,
    itemParent: ItemParent,
  }),
  'Item',
);
export type Item = t.TypeOf<typeof Item>;

export const FileItemPath = NonEmptyString;
export type FileItemPath = t.TypeOf<typeof FileItemPath>;

export const FileItemType = t.brand(
  t.string,
  (s): s is t.Branded<string, FileItemTypeBrand> => typeof s === 'string' && FileItemTypes.includes(s),
  'FileItemType',
);
export type FileItemType = t.TypeOf<typeof FileItemType>;

export const FileItemId = t.brand(
  t.string,
  (str): str is t.Branded<string, FileItemIdBrand> => typeof str === 'string',
  'FileItemId',
);
export type FileItemId = t.TypeOf<typeof FileItemId>;

export const FileItem = t.readonly(
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
export type FileItem = t.TypeOf<typeof FileItem>;

export const LineNumber = PositiveInteger;
export type LineNumber = t.TypeOf<typeof LineNumber>;

export const ColumnNumber = PositiveInteger;
export type ColumnNumber = t.TypeOf<typeof ColumnNumber>;

export const ContentLocation = t.type(
  {
    line: LineNumber,
    column: ColumnNumber,
  },
  'ContentLocation',
);
export type ContentLocation = t.TypeOf<typeof ContentLocation>;

export const FileContentItemType = t.brand(
  ItemType,
  (s): s is t.Branded<string, ItemTypeBrand & FileContentItemTypeBrand> =>
    typeof s === 'string' && FileContentItemTypes.includes(s),
  'FileContentItemType',
);
export type FileContentItemType = t.TypeOf<typeof FileContentItemType>;

export const FileContentItem = t.readonly(
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
export type FileContentItem = t.TypeOf<typeof FileContentItem>;

export type FeatureItem = FileItem | FileContentItem;

export const DirectorySearchPattern = t.brand(
  t.readonlyArray(t.string),
  (pattern): pattern is t.Branded<ReadonlyArray<string>, DirectorySearchPatternBrand> =>
    Array.isArray(pattern) &&
    pattern.length > 0 &&
    pattern.reduce((result, value) => (typeof value === 'string' ? result : false), true),
  'DirectorySearchPattern',
);
export type DirectorySearchPattern = t.TypeOf<typeof DirectorySearchPattern>;

//
// Service and Dependencies
//
export type Dependencies = {
  readonly messageBus: MessageBus;
};

export type State = {
  readonly dependencies: Dependencies | undefined;
};

const initialState: State = {
  dependencies: undefined,
};

export const Service = new BehaviorSubject<State>(initialState);
export type Service = typeof Service;
