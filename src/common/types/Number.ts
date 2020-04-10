/**
 * Codecs and type definitions representing simple number types with added constraints
 * @internal
 * @category Types
 * @packageDocumentation
 */
import * as t from 'io-ts';

// type NumberBrand = { readonly Number: unique symbol };
// /**
//  * Branded Numbers -- possibly useful just to ensure a number has gone through a smart constructor?
//  *
//  * @category Codec
//  */
// const Number = t.brand(t.number, (num): num is t.Branded<number, NumberBrand> => typeof num === 'number', 'Number');
// type Number = t.TypeOf<typeof Number>;
// export { Number };

type PositiveNumberBrand = { readonly PositiveNumber: unique symbol };
/**
 * Numbers >= 0
 *
 * @category Codec
 */
const PositiveNumber = t.brand(
  t.number,
  (num): num is t.Branded<number, PositiveNumberBrand> => num > 0,
  'PositiveNumber',
);
type PositiveNumber = t.TypeOf<typeof PositiveNumber>;
export { PositiveNumber };

type NonNegativeNumberBrand = { readonly NonNegativeNumber: unique symbol };
/**
 * Numbers >= 0
 * @category Codec
 */
const NonNegativeNumber = t.brand(
  t.number,
  (num): num is t.Branded<number, NonNegativeNumberBrand> => num >= 0,
  'NonNegativeNumber',
);
type NonNegativeNumber = t.TypeOf<typeof NonNegativeNumber>;
export { NonNegativeNumber };

type NegativeNumberBrand = { readonly NegativeNumber: unique symbol };
/**
 * Numbers < 0
 * @category Codec
 */
const NegativeNumber = t.brand(
  t.number,
  (num): num is t.Branded<number, NegativeNumberBrand> => num < 0,
  'NegativeNumber',
);
type NegativeNumber = t.TypeOf<typeof NegativeNumber>;
export { NegativeNumber };
