/**
 * Utility functions for working with arrays
 * @packageDocumentation
 */

/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */

/**
 * Typescript doesn't provide a way to convert an immutable array to a mutable array.
 *
 * @param originalArray The array that needs to be converted to a mutable array
 * @returns A new mutable array
 */
export const mutableArrayOf = <T>(originalArray: readonly T[] | T[]): T[] => {
  const newArray: T[] = originalArray.concat([]);
  return newArray;
};

/**
 * This ensures that isArray will correctly type narrow for both mutable and readonly Arrays
 * See: https://github.com/microsoft/TypeScript/issues/17002
 */
// declare global {
//   type ArrayConstructor = {
//     isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>;
//   };
// }
