import * as it from '../interfaceTypes';
import * as dt from '../domainTypes';
import { PathReporter } from 'io-ts/lib/PathReporter';

describe('FileItem', () => {
  const validFileItem: it.FileItem = {
    itemId: '1',
    itemType: 'FEATURE_FILE',
    itemName: 'add_to_cart.feature',
    itemDescription: '',
    itemParent: undefined,
    fileItemId: '1',
    fileItemPath: '/feature/add_to_cart.feature',
  };

  const invalidFileItem: it.FileItem = {
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
      expect(dt.FileItemPath.is('')).toBe(false);
    });
    test('should return true for a non-empty string', () => {
      expect(dt.FileItemPath.is('non-empty')).toBe(true);
    });
  });

  describe('FileItemType.is()', () => {
    test.each(dt.FileItemTypes)('should return true for %s', input => {
      expect(dt.FileItemType.is(input)).toBe(true);
    });
    test.each(dt.FileContentItemTypes)('should return false for %s', input => {
      expect(dt.FileItemType.is(input)).toBe(false);
    });
  });

  describe('FileItem.is()', () => {
    test('should return true for a valid FileItem value', () => {
      expect(dt.FileItem.is(validFileItem)).toBe(true);
    });
    test('should return false for an invalid FileItem value', () => {
      expect(dt.FileItem.is({})).toBe(false);
    });
  });

  describe('FileItem.decode()', () => {
    test('should return a Right for valid data', () => {
      expect(dt.FileItem.decode(validFileItem)).toBeRight();
    });
    test('should return a Left for invalid data', () => {
      expect(dt.FileItem.decode(invalidFileItem)).toBeLeft();
    });
  });
});

describe('ItemType', () => {
  describe('ItemType.is()', () => {
    test('should return false when the input is not a valid ItemType', () => {
      expect(dt.ItemType.is('not an ItemType')).toBe(false);
    });
    test('should return false when the input is not a string', () => {
      expect(dt.ItemType.is(1)).toBe(false);
    });
    test.each(dt.FileItemTypes)('should return true when the input is the valid FileItemType %s', input => {
      expect(dt.ItemType.is(input)).toBe(true);
    });
    test.each(dt.FileContentItemTypes)('should return true when the input is the FileContentItemType %s', input => {
      expect(dt.ItemType.is(input)).toBe(true);
    });
  });
});

describe('FileContentItem', () => {
  const validFileContentItem: it.FileContentItem = {
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

  const invalidFileContentItem: it.FileContentItem = {
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
    test.each(dt.FileContentItemTypes)('should return true for %s', input => {
      expect(dt.FileContentItemType.is(input)).toBe(true);
    });
    test.each(dt.FileItemTypes)('should return false for %s', input => {
      expect(dt.FileContentItemType.is(input)).toBe(false);
    });
  });

  describe('FileContentItem.is()', () => {
    test('should return true for a valid FileItem value', () => {
      expect(dt.FileContentItem.is(validFileContentItem)).toBe(true);
    });
    test('should return false for an invalid FileItem value', () => {
      expect(dt.FileContentItem.is({})).toBe(false);
    });
  });

  describe('FileContentItem.decode()', () => {
    test('should return a Right for valid data', () => {
      expect(dt.FileContentItem.decode(validFileContentItem)).toBeRight();
    });
    test('should return a Left for invalid data', () => {
      expect(dt.FileContentItem.decode(invalidFileContentItem)).toBeLeft();
    });
  });
});

describe('Item', () => {
  const validItem: it.Item = {
    itemId: '1',
    itemType: 'FEATURE',
    itemName: 'Add to cart',
    itemDescription: 'Add the selected item to the customer cart',
    itemParent: '6',
  };

  const badItemTypeItem: it.Item = {
    itemId: '1',
    itemType: 'Not a valid ItemType',
    itemName: 'Add to cart',
    itemDescription: 'Add the selected item to the customer cart',
    itemParent: undefined,
  };

  describe('Item.name', () => {
    test('should be Item', () => {
      expect(dt.Item.name).toBe('Item');
    });
  });

  describe('Item.is()', () => {
    test('should return false when the supplied value is not a valid Item object', () => {
      expect(dt.Item.is(badItemTypeItem)).toBe(false);
    });
    test('should return true when the supplied value is a valid Item', () => {
      expect(dt.Item.is(validItem)).toBe(true);
    });
  });

  describe('Item.ItemType.encode()', () => {
    test('should encode a static object that matches the requirements for an Item object', () => {
      expect(dt.Item.encode((validItem as unknown) as dt.Item)).toEqual(validItem);
    });
  });

  describe('Item.ItemType.decode()', () => {
    test('should succeed for a valid Item object', () => {
      expect(dt.Item.decode(validItem)).toEqualRight(validItem);
    });
    test('should fail for a invalid Item object', () => {
      expect(dt.Item.decode(badItemTypeItem)).toBeLeft();
    });
    test('failure will report correctly when using PathReporter', () => {
      expect(PathReporter.report(dt.Item.decode(badItemTypeItem))).toEqual([
        'Invalid value "Not a valid ItemType" supplied to : Item/itemType: ItemType',
      ]);
    });
  });
});

describe('ContentLocation', () => {
  const data: Array<Array<any>> = [
    [true, 'a valid location', { line: 1, column: 1 }],
    [false, 'an undefined location', undefined],
    [false, 'an line value of 0', { line: 0, column: 1 }],
    [false, 'an column value < 0', { line: 1, column: -1 }],
  ];
  describe('ContentLocation.is()', () => {
    test.each(data)('should return %p for %s', (result, _description, input) => {
      expect(dt.ContentLocation.is(input)).toBe(result);
    });
  });
});
