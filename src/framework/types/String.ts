/**
 * Codecs and type definitions representing simple number types with added constraints
 * @internal
 * @category Types
 * @packageDocumentation
 */
import * as t from 'io-ts';

// type StringBrand = { readonly String: unique symbol };
// /**
//  * String - possibly useful to ensure a string has gone through a smart constructor?
//  * t.string produces a string primitive as output where this would produce a branded string...
//  *
//  * @category Codec
//  */
// const String = t.brand(t.string, (str): str is t.Branded<string, StringBrand> => typeof str === 'string', 'String');
// type String = t.TypeOf<typeof String>;
// export { String };

export type NonEmptyStringBrand = { readonly NonEmptyString: unique symbol };
/**
 * NonEmptyString
 *
 * @category Codec
 */
const NonEmptyString = t.brand(
  t.string,
  (str): str is t.Branded<string, NonEmptyStringBrand> => str.length > 0,
  'NonEmptyString',
);
type NonEmptyString = t.TypeOf<typeof NonEmptyString>;
export { NonEmptyString };
