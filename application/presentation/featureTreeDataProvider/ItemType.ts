import * as t from 'io-ts';

export const FileItemTypes = ['FEATURE_DIRECTORY', 'FEATURE_FILE'];
export const FileContentItemTypes = ['FEATURE', 'SCENARIO', 'SCENARIO_OUTLINE', 'EXAMPLES', 'RULE'];
export const ItemTypes = [...FileItemTypes, ...FileContentItemTypes];
export type ItemTypeBrand = { readonly ItemType: unique symbol };
/**
 * `ItemType` represents the type of an Item - either one of the `FileItemTypes`
 * or one of the `FileContentItemTypes`
 * @category Codec
 */
const ItemType = t.brand(
  t.string,
  (s): s is t.Branded<string, ItemTypeBrand> => typeof s === 'string' && ItemTypes.includes(s),
  'ItemType',
);
type ItemType = t.TypeOf<typeof ItemType>;
export { ItemType };
