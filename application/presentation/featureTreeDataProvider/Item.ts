/**
 * @packageDocumentation
 * A item - either a {@link FileItem} or a {@link FileContentItem}
 */
import * as t from 'io-ts';
import { ItemType } from './ItemType';
import { NonEmptyString } from '../../common/types';

/** ItemId */
const ItemId = NonEmptyString;
type ItemId = t.TypeOf<typeof ItemId>;
export { ItemId };

/** ItemName */
const ItemName = t.string;
type ItemName = t.TypeOf<typeof ItemName>;
export { ItemName };

/** ItemDescription */
const ItemDescription = t.string;
type ItemDescription = t.TypeOf<typeof ItemDescription>;
export { ItemDescription };

/** ItemParent */
const ItemParent = t.union([ItemId, t.undefined], 'ItemParent');
type ItemParent = t.TypeOf<typeof ItemDescription>;
export { ItemParent };

/** Item */
const Item = t.readonly(
  t.type({
    itemId: ItemId,
    itemType: ItemType,
    itemName: ItemName,
    itemDescription: ItemDescription,
    itemParent: ItemParent,
  }),
  'Item',
);
type Item = t.TypeOf<typeof Item>;
export { Item };
export type ItemDTO = ReturnType<typeof Item.encode>;
