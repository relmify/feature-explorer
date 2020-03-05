import * as t from 'io-ts';

/**
 * Represents the location of an item relative to other items located at the same path. The first
 * item has a relative location of zero.
 */
type RelativeLocation = t.Int;

type TextFileLocation = {
  readonly line: t.Int;
  readonly column: t.Int;
};

/**
 * Represents the absolute location of an item within its path. The absolute location allows
 * you to "jump" directly to the location of the item, whereas the relative location just
 * tells you the order of the items. Currently only the TextFileLocation type is supported.
 */
type AbsoluteLocation = TextFileLocation;

/**
 * Represents the relative location of an item relative to other items located at the same path, and
 * optionally the absolute location of the item.
 */
export type ItemLocation = {
  readonly relativeLocation: RelativeLocation;
  readonly absoluteLocation?: AbsoluteLocation;
};
export const ItemLocationOf = (
  relativeLocation: RelativeLocation,
  absoluteLocation?: AbsoluteLocation,
): ItemLocation => {
  return { relativeLocation: relativeLocation, absoluteLocation: absoluteLocation };
};
