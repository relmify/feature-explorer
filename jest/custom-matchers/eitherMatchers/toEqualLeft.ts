import { matcherHint, printExpected } from 'jest-matcher-utils';
import { Either } from 'fp-ts/lib/Either';
import { applyPredicateLeft, equals } from '../predicates';
import { diffReceivedLeft } from '../either/print';

declare global {
  namespace jest {
    interface Matchers<R> {
      readonly toEqualLeft: (expected: unknown) => R;
    }
  }
}

const passMessage = <L>(expected: L) => () =>
  matcherHint('.not.toEqualLeft', 'received', 'expectedLeft') +
  '\n\n' +
  'Expected Either not to equal left:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  "But it's the same.";

const failMessage = <L>(received: Either<L, unknown>, expected: L) => () => {
  return matcherHint('.toEqualLeft', 'received', 'expectedLeft') + '\n\n' + diffReceivedLeft(received, expected);
};

/**
 * Check that the supplied Either is a Left that equals an expected value
 */
export const toEqualLeft = <L>(received: Either<L, unknown>, expected: L): jest.CustomMatcherResult => {
  const predicate = equals(expected);
  const pass = applyPredicateLeft(predicate as (value: unknown) => boolean)(received);

  return {
    pass: pass,
    message: pass ? passMessage(expected) : failMessage(received, expected),
  };
};
