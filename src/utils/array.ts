/**
 * @file Utility functions for working with arrays
 */

/**
 * Typescript doesn't provide a way to convert an immutable array to a mutable array.
 * All of the functional array methods (map, filter, etc) that create new arrays
 * create the same kind of array that they start with. Normally this is a good thing
 * since we always want to use immutable arrays in functional code. This utilty fuction
 * can help though if you need to conform to an external interface that expects a
 * mutable array.
 *
 * @param {Array} originalArray The array that needs to be converted to a mutable array
 * @returns {Array} A new mutable array
 */
/* eslint-disable-next-line functional/prefer-readonly-type */
export const mutableArrayOf = <T>(originalArray: readonly T[] | T[]): T[] => {
  /* eslint-disable-next-line functional/no-conditional-statement, no-prototype-builtins */
  if (originalArray.hasOwnProperty('isArray')) {
    return [...originalArray];
  }
  /* eslint-disable-next-line functional/prefer-readonly-type */
  const newArray: T[] = [];
  /* eslint-disable-next-line functional/no-loop-statement */
  for (const value of originalArray.values()) {
    /* eslint-disable-next-line functional/immutable-data, functional/no-expression-statement */
    newArray.push(value);
  }
  return newArray;
};
