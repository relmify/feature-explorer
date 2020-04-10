import { ItemType, FileItemTypes, FileContentItemTypes } from '../ItemType';

describe('ItemType.is', () => {
  test('should return false when the input is not a valid ItemType', () => {
    expect(ItemType.is('not an ItemType')).toBe(false);
  });
  test('should return false when the input is not a string', () => {
    expect(ItemType.is(1)).toBe(false);
  });
  test.each(FileItemTypes)('should return true when the input is the valid FileItemType %s', input => {
    expect(ItemType.is(input)).toBe(true);
  });
  test.each(FileContentItemTypes)('should return true when the input is the FileContentItemType %s', input => {
    expect(ItemType.is(input)).toBe(true);
  });
});
