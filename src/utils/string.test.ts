import { expect } from 'chai';
import { isRight, isLeft } from 'fp-ts/lib/Either';
import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString';
import { unsafeNonEmptyStringOf } from '../test/utils/unsafeBaseTypes';

describe('util/string', () => {
  context('NonEmptyString.is', () => {
    it('returns false if the string is empty', () => {
      const input = '';
      expect(NonEmptyString.is(input)).to.be.false;
    });
    it('returns true if the string is not empty', () => {
      const input = 'not empty';
      expect(NonEmptyString.is(input)).to.be.true;
    });
  });
  context('NonEmptyString.decode', () => {
    it('returns a Left if an empty string is passed', () => {
      expect(isLeft(NonEmptyString.decode(''))).to.be.true;
    });
    it('returns a Right if a non-empty string literal is passed', () => {
      expect(isRight(NonEmptyString.decode('1'))).to.be.true;
    });
    it('returns a Right if a non-empty string value is passed', () => {
      const two = '2';
      expect(isRight(NonEmptyString.decode(two))).to.be.true;
    });
  });
  // Validate is the same as decode, but you can pass a context to indicate where the error occurred
  // The key is used to specify the object property key that was being validated and actual is
  // is used to for value that was found at that key
  context('NonEmptyString.validate', () => {
    it('returns a Left if an empty string is passed', () => {
      const emptyString = '';
      expect(isLeft(NonEmptyString.validate(emptyString, [{ key: '', type: NonEmptyString, actual: emptyString }]))).to
        .be.true;
    });
    it('returns a Right if a non-empty string literal is passed', () => {
      expect(isRight(NonEmptyString.validate('1', [{ key: '', type: NonEmptyString, actual: '1' }]))).to.be.true;
    });
    it('returns a Right if a non-empty string value is passed', () => {
      const two = '2';
      expect(isRight(NonEmptyString.validate(two, [{ key: '', type: NonEmptyString, actual: two }]))).to.be.true;
    });
  });
  context('NonEmptyString.encode', () => {
    it('returns a regular string from a NonEmptyString', () => {
      const input = unsafeNonEmptyStringOf('original string');
      const result = 'original string';
      expect(NonEmptyString.encode(input)).to.equal(result);
    });
  });
});
