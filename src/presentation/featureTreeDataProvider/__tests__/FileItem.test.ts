import { FileItemPath, FileItemType, FileItem, FileItemData, createFileItem } from '../FileItem';
import { FileItemTypes, FileContentItemTypes } from '../ItemType';

const validData: FileItemData = {
  itemId: '1',
  itemType: 'FEATURE_FILE',
  itemName: 'add_to_cart.feature',
  itemDescription: '',
  itemParent: undefined,
  fileItemId: '1',
  fileItemPath: '/feature/add_to_cart.feature',
};

const invalidData: FileItemData = {
  itemId: '',
  itemType: 'FEATURE_FILE',
  itemName: 'add_to_cart.feature',
  itemDescription: '',
  itemParent: undefined,
  fileItemId: '1',
  fileItemPath: '/feature/add_to_cart.feature',
};

describe('FileItemPath.is()', () => {
  test('should return false for an empty string', () => {
    expect(FileItemPath.is('')).toBe(false);
  });
  test('should return true for a non-empty string', () => {
    expect(FileItemPath.is('non-empty')).toBe(true);
  });
});

describe('FileItemType.is()', () => {
  test.each(FileItemTypes)('should return true for %s', input => {
    expect(FileItemType.is(input)).toBe(true);
  });
  test.each(FileContentItemTypes)('should return false for %s', input => {
    expect(FileItemType.is(input)).toBe(false);
  });
});

describe('FileItem.is()', () => {
  test('should return true for a valid FileItem value', () => {
    expect(FileItem.is(validData)).toBe(true);
  });
  test('should return false for an invalid FileItem value', () => {
    expect(FileItem.is({})).toBe(false);
  });
});

describe('createFileItem()', () => {
  test('should return a Right for valid data', () => {
    expect(createFileItem(validData)).toBeRight();
  });
  test('should return a Left for invalid data', () => {
    expect(createFileItem(invalidData)).toBeLeft();
  });
});
