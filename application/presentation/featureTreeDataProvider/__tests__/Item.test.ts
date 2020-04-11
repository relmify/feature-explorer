import { PathReporter } from 'io-ts/lib/PathReporter';
import { Item } from '../Item';

const validItem = {
  itemId: '1',
  itemType: 'FEATURE',
  itemName: 'Add to cart',
  itemDescription: 'Add the selected item to the customer cart',
  itemParent: '6',
};

const badItemTypeItem = {
  itemId: '1',
  itemType: 'Not a valid ItemType',
  itemName: 'Add to cart',
  itemDescription: 'Add the selected item to the customer cart',
  itemParent: undefined,
};

describe('Item.name', () => {
  test('should be Item', () => {
    expect(Item.name).toBe('Item');
  });
});

describe('Item.is', () => {
  test('should return false when the supplied value is not a valid Item object', () => {
    expect(Item.is(badItemTypeItem)).toBe(false);
  });
  test('should return true when the supplied value is a valid Item', () => {
    expect(Item.is(validItem)).toBe(true);
  });
});

describe('Item.ItemType.encode', () => {
  test('should encode a static object that matches the requirements for an Item object', () => {
    expect(Item.encode((validItem as unknown) as Item)).toEqual(validItem);
  });
});

describe('Item.ItemType.decode', () => {
  test('should succeed for a valid Item object', () => {
    expect(Item.decode(validItem)).toMatchRightObject(validItem);
  });
  test('should fail for a invalid Item object', () => {
    expect(Item.decode(badItemTypeItem)).toBeLeft();
  });
  test('failure will report correctly when using PathReporter', () => {
    expect(PathReporter.report(Item.decode(badItemTypeItem))).toEqual([
      'Invalid value "Not a valid ItemType" supplied to : Item/itemType: ItemType',
    ]);
  });
});
