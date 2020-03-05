/**
 * @file Utilities to help with testing string types
 */
import { getOrElse } from 'fp-ts/lib/Either';
//import { NonEmptyString } from '../../utils/string';
import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString';
import * as t from 'io-ts';

/**
 * Creates a NonEmptyString or throws an error
 *
 * @param inputString the string to attempt to convert to a NonEmptyString
 * @returns the NonEmptyString version of inputString
 */
export const unsafeNonEmptyStringOf = (inputString: string): NonEmptyString => {
  /* eslint-disable-next-line functional/functional-parameters */
  return getOrElse<t.Errors, NonEmptyString>(() => {
    /* eslint-disable-next-line functional/no-throw-statement */
    throw TypeError('unsafeNonEmptyStringOf: Expected a non-empty string');
  })(NonEmptyString.decode(inputString));
};

/**
 * Creates a t.int or throws an error
 *
 * @param inputNumber the number to attempt to convert to a t.Int
 * @returns the t.Int version of the number or throws an exception
 */
export const unsafeIntOf = (inputNumber: number): t.Int => {
  /* eslint-disable-next-line functional/functional-parameters */
  return getOrElse<t.Errors, t.Int>(() => {
    /* eslint-disable-next-line functional/no-throw-statement */
    throw TypeError('Expected an integer. Got ${inputNumber}.');
  })(t.Int.decode(inputNumber));
};
