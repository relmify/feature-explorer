import { expect } from 'chai';
import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString';
import { unsafeNonEmptyStringOf } from './unsafeBaseTypes';

describe('', () => {
  context('unsafeNonEmptyStringOf', () => {
    it('satisfies compile-time checking', () => {
      const regularString = 'not empty';
      // Note: You should create your NonEmptyString using NonEmptyString.decode()
      // unsafeNonEmptyStringOf is just a convenience function to be used in test code
      // where it's fine to throw an exception
      const nonEmptyString: NonEmptyString = unsafeNonEmptyStringOf(regularString);

      // The following cases are disallowed at compile time:
      // const testString: NonEmptyString = 'not assignable compiler error';
      // const anotherTestString: NonEmptyString = regularString;

      // Branding information is stored in a fake property that does not exist at run time
      // The runtime string is unchanged
      expect(nonEmptyString).to.equal(regularString);
    });
    it('does not maintain branding information for run time type identification', () => {
      // Just driving home the point
      // Branding information is stored in a fake property that does not exist at run time
      // Run time type identification based on brand is not possible for branded types
      const regularString = 'regular string';
      const nonEmptyString: NonEmptyString = unsafeNonEmptyStringOf(regularString);
      expect(nonEmptyString).to.not.haveOwnPropertyDescriptor('_brand');
    });
    it('throws an error if you pass an empty string', () => {
      const emptyString = '';
      expect(() => {
        return unsafeNonEmptyStringOf(emptyString);
      }).to.throw(TypeError, /NonEmptyString/);
    });
    it('does not throw an error if you pass a non-empty string', () => {
      const nonEmptyString = 'not empty';
      expect(unsafeNonEmptyStringOf(nonEmptyString)).to.equal(nonEmptyString);
    });
  });
});
