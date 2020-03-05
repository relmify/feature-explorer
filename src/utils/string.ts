/**
 * @file Utility functions and types for working with strings
 */
import * as t from 'io-ts';

/**
 * A unique brand for non-empty strings
 */
type NonEmptyBrand = {
  readonly NonEmptyString: unique symbol; // use `unique symbol` here to ensure uniqueness across modules / packages
};

/**
 * NonEmptyString codec for decoding IO strings to NonEmptyStrings and encoding NonEmptyStrings as strings
 */
const NonEmptyString = t.brand(
  t.string,
  (str): str is t.Branded<string, NonEmptyBrand> => str !== '',
  'NonEmptyString',
);

/**
 * A NonEmptyString is a string that has been validated to contain at least one character.
 *
 * @typedef NonEmptyString A string that must contain at least one character
 * @property {string} name 'NonEmptyString'
 * @property {Function} is A custom typeguard that checks if the value is a NonEmptyString
 * @property {Function} validate Succeeds if the supplied argument can be decoded to a NonEmptyString. Return value is an Either.
 * @property {Function} encode Converts a NonEmptyString to a regular string
 * @property {Function} decode Same as validate, but with default context
 */
type NonEmptyString = t.TypeOf<typeof NonEmptyString>;

// Export both the codec and the type
export { NonEmptyString };
