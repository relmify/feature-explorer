import { FileContentItemType, FileContentItem, FileContentItemData, createFileContentItem } from '../FileContentItem';
// import { ItemId } from '../Item';
// import { FileItemTypes, FileContentItemTypes } from '../ItemType';
// import { AbsoluteLocation, RelativeLocation, ColumnNumber, LineNumber } from '../ItemLocation';
import { FileItemTypes, FileContentItemTypes } from '../index';

const validData: FileContentItemData = {
  itemId: '1',
  itemType: 'FEATURE',
  itemName: 'Feature',
  itemDescription: 'Add item to cart',
  itemParent: undefined,
  contentIndex: 0,
  contentLocation: {
    line: 1,
    column: 1,
  },
};

const invalidData: FileContentItemData = {
  itemId: '',
  itemType: 'FEATURE',
  itemName: 'Feature',
  itemDescription: 'Add item to cart',
  itemParent: undefined,
  contentIndex: 0,
  contentLocation: {
    line: 1,
    column: 1,
  },
};

describe('FileContentItemType.is()', () => {
  test.each(FileContentItemTypes)('should return true for %s', input => {
    expect(FileContentItemType.is(input)).toBe(true);
  });
  test.each(FileItemTypes)('should return false for %s', input => {
    expect(FileContentItemType.is(input)).toBe(false);
  });
});

describe('FileContentItem.is()', () => {
  test('should return true for a valid FileItem value', () => {
    expect(FileContentItem.is(validData)).toBe(true);
  });
  test('should return false for an invalid FileItem value', () => {
    expect(FileContentItem.is({})).toBe(false);
  });
});

describe('createFileContentItem()', () => {
  test('should return a Right for valid data', () => {
    expect(createFileContentItem(validData)).toBeRight();
  });
  test('should return a Left for invalid data', () => {
    expect(createFileContentItem(invalidData)).toBeLeft();
  });
});
