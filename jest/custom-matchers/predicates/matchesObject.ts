import { equals as jestEquals, iterableEquality, subsetEquality } from '../common/jestUtils';

/**
 * Returns true if the received object is a superset of the expected object
 */
export const matchesObject = (expected: unknown) => (received: unknown): boolean =>
  jestEquals(received, expected, [iterableEquality, subsetEquality]);
