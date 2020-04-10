import { matcherHint, printExpected } from 'jest-matcher-utils';
import { Either } from 'fp-ts/lib/Either';
import { matchesObject, applyPredicateLeft } from '../predicates';
import { printReceivedLeft } from '../either/print';

declare global {
  namespace jest {
    interface Matchers<R> {
      readonly toMatchLeftObject: (expected: unknown) => R;
    }
  }
}

const passMessage = <L>(recieved: Either<L, unknown>, expected: RegExp | Partial<L>) => () =>
  matcherHint('.not.toMatchLeft', 'received', 'expectedLeft') +
  '\n\n' +
  'Expected Either not to match left:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  printReceivedLeft(recieved);

const failMessage = <L>(actual: Either<L, unknown>, expected: RegExp | Partial<L>) => () =>
  matcherHint('.toMatchLeft', 'received', 'expectedLeft') +
  '\n\n' +
  'Expected Either to match left:\n' +
  `  ${printExpected(expected)}` +
  '\n\n' +
  printReceivedLeft(actual);

/**
 * Used to check that a received value is a Left with an object value that is the same as,
 * or a superset of the expected object.
 */
export const toMatchLeftObject = <L>(received: Either<L, unknown>, expected: Partial<L>): jest.CustomMatcherResult => {
  const predicate = matchesObject(expected);
  const pass = applyPredicateLeft(predicate as (value: unknown) => boolean)(received);

  return {
    pass,
    message: pass ? passMessage(received, expected) : failMessage(received, expected),
  };
};
