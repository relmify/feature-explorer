/**
 * Codecs and type definitions representing simple integer number types
 * @internal
 * @category Types
 * @packageDocumentation
 */
import * as t from 'io-ts';

import { PositiveNumber, NonNegativeNumber, NegativeNumber } from './Number';

export type IntegerBrand = { readonly Integer: unique symbol };
/**
 * Integer
 *
 * @category Codec
 */
const Integer = t.brand(
  t.number,
  (num): num is t.Branded<number, IntegerBrand> =>
    //  Number.isInteger(num) && num <= Number.MAX_SAFE_INTEGER && num >= -Number.MAX_SAFE_INTEGER,
    Number.isInteger(num),
  'Integer',
);
type Integer = t.TypeOf<typeof Integer>;
export { Integer };

/**
 * Integers > 0
 * @category Codec
 */
const PositiveInteger = t.intersection([PositiveNumber, Integer]);
type PositiveInteger = t.TypeOf<typeof PositiveInteger>;
export { PositiveInteger };

/**
 * Integers >= 0
 * @category Codec
 */
const NonNegativeInteger = t.intersection([NonNegativeNumber, Integer]);
type NonNegativeInteger = t.TypeOf<typeof NonNegativeInteger>;
export { NonNegativeInteger };

/**
 * Integers < 0
 * @category Codec
 */
const NegativeInteger = t.intersection([NegativeNumber, Integer]);
type NegativeInteger = t.TypeOf<typeof NegativeInteger>;
export { NegativeInteger };
