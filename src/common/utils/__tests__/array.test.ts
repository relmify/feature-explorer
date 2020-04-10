import { mutableArrayOf } from '../array';

describe('util/array', () => {
  describe('mutableArrayOf', () => {
    test('returns a different array if the original array is mutable', () => {
      const aMutableArray: Array<string> = ['change', 'is'];
      expect(mutableArrayOf(aMutableArray)).not.toBe(aMutableArray);
    });
    test('returns a different array if the original array is readonly', () => {
      const aReadonlyArray: ReadonlyArray<string> = ['the', 'only', 'constant'];
      expect(mutableArrayOf(aReadonlyArray)).not.toBe(aReadonlyArray);
    });
    test('returns an array that contains the same values as the orginal arry', () => {
      const aReadonlyArray: ReadonlyArray<string> = ['the', 'only', 'constant'];
      const savedArray = [...aReadonlyArray];
      const resultingArray = mutableArrayOf(aReadonlyArray);
      expect(resultingArray).toEqual(savedArray);
    });
    test('`push` should work on the resulting array', () => {
      const aReadonlyArray: ReadonlyArray<string> = ['the', 'only', 'constant'];
      const savedArray: ReadonlyArray<string> = [...aReadonlyArray];
      const resultingArray = mutableArrayOf(aReadonlyArray);
      resultingArray.push('!');
      expect(resultingArray).toEqual([...savedArray, '!']);
    });
    test('the orginal array should not be changed when pushing to the resulting array', () => {
      const aReadonlyArray: ReadonlyArray<string> = ['the', 'only', 'constant'];
      const savedArray: ReadonlyArray<string> = [...aReadonlyArray];
      const resultingArray = mutableArrayOf(aReadonlyArray);
      resultingArray.push('!');
      expect(aReadonlyArray).toEqual(savedArray);
    });
  });
});
