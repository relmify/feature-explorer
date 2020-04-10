import { equals as jestEquals, iterableEquality, typeEquality, sparseArrayEquality } from '../common/jestUtils';

/**
 * Returns true if the shape and value of the received object or primitive is
 * equal to the shape and value of expected object or primitive.
 * All keys must be present, but the check will still succeed
 * if some are undefined.
 */
export const equals = (expected: unknown) => (received: unknown): boolean =>
  jestEquals(received, expected, [iterableEquality]);

/**
 * Returns true if the shape and value of the received object or primitive is
 * equal to the shape and value of expected object or primitive.
 * All keys must be present and defined.
 */
export const strictEquals = (expected: unknown) => (received: unknown): boolean =>
  jestEquals(received, expected, [iterableEquality, typeEquality, sparseArrayEquality], true);
