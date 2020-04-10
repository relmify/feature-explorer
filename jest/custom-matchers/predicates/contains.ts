import { equals as jestEquals } from '../common/jestUtils';

/**
 * Returns true if the received array contains the expected value
 */
export const contains = <T>(expectedValue: T) => (receivedArray: Array<T> | ReadonlyArray<T>) => {
  return receivedArray.findIndex(item => jestEquals(item, expectedValue)) > -1;
};
