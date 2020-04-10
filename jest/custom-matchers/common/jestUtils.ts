/*
 * Additional utility functions from jest/expect. Note that these functions
 * are not part of the official external API, so they are subject to
 * change without notice.
 */
export { equals, isA } from 'expect/build/jasmineUtils';
export {
  iterableEquality,
  subsetEquality,
  typeEquality,
  sparseArrayEquality,
  partition,
  isError,
  emptyObject as isEmptyObject,
  isOneline,
  hasOwnProperty,
  getPath,
  getObjectSubset,
} from 'expect/build/utils';
