import { expect } from 'chai';
import { mutableArrayOf } from './array';

describe('util/array', () => {
  context('mutableArrayOf', () => {
    it('returns a mutable array if a mutable array is passed', () => {
      expect(mutableArrayOf(['mutable', 'array'])).to.have.deep.members(['mutable', 'array']);
    });
    it('returns a mutable array if a readonly array is passed', () => {
      expect(mutableArrayOf(['readonly', 'array'] as ReadonlyArray<string>)).to.have.deep.members([
        'readonly',
        'array',
      ]);
    });
    it('returns a new array even if the original array is mutable', () => {
      const orginalArray = ['original', 'array'];
      expect(mutableArrayOf(orginalArray)).to.not.equal(orginalArray);
    });
  });
});
