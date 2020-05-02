/**
 * Codecs and type definitions representing simple number types with added constraints
 * @internal
 * @category Types
 * @packageDocumentation
 */
import * as t from 'io-ts';

//
// Brands
//
export type PositiveNumberBrand = { readonly PositiveNumber: unique symbol };
export type NonNegativeNumberBrand = { readonly NonNegativeNumber: unique symbol };
export type NegativeNumberBrand = { readonly NegativeNumber: unique symbol };
export type NonZeroNumberBrand = { readonly NonZeroNumber: unique symbol };

/**
 * Numbers >= 0
 *
 * @category Codec
 */
export const PositiveNumber = t.brand(
  t.number,
  (num): num is t.Branded<number, PositiveNumberBrand> => num > 0,
  'PositiveNumber',
);
export type PositiveNumber = t.TypeOf<typeof PositiveNumber>;

/**
 * Numbers >= 0
 * @category Codec
 */
export const NonNegativeNumber = t.brand(
  t.number,
  (num): num is t.Branded<number, NonNegativeNumberBrand> => num >= 0,
  'NonNegativeNumber',
);
export type NonNegativeNumber = t.TypeOf<typeof NonNegativeNumber>;

/**
 * Numbers < 0
 * @category Codec
 */
export const NegativeNumber = t.brand(
  t.number,
  (num): num is t.Branded<number, NegativeNumberBrand> => num < 0,
  'NegativeNumber',
);
export type NegativeNumber = t.TypeOf<typeof NegativeNumber>;

/**
 * Numbers !== 0
 *
 * @category Codec
 */
export const NonZeroNumber = t.brand(
  t.number,
  (num): num is t.Branded<number, NonZeroNumberBrand> => num !== 0 && !isNaN(num),
  'NonZeroNumber',
);
export type NonZeroNumber = t.TypeOf<typeof NonZeroNumber>;
