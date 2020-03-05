import { expect } from 'chai';
import { unsafeNonEmptyStringOf, unsafeIntOf } from '../../../test/utils/unsafeBaseTypes';
import { fileItemOf, fileContentItemOf, FeatureItem, FileItemType, FileContentItemType, itemId } from './FeatureItem';

//
// Test Data
//
const featuresDirectory = fileItemOf(
  FileItemType.FeatureDirectory,
  unsafeNonEmptyStringOf('0'),
  'features',
  '',
  unsafeNonEmptyStringOf('features'),
  undefined,
);
const cartDirectory = fileItemOf(
  FileItemType.FeatureDirectory,
  unsafeNonEmptyStringOf('1'),
  'cart',
  '',
  unsafeNonEmptyStringOf('features/cart'),
  featuresDirectory.itemId,
);
const addToCartFeatureFile = fileItemOf(
  FileItemType.FeatureFile,
  unsafeNonEmptyStringOf('2'),
  'add_to_cart',
  'Warning: no scenarios',
  unsafeNonEmptyStringOf('features/cart/add_to_cart.feature'),
  cartDirectory.itemId,
);
const removeFromCartFeatureFile = fileItemOf(
  FileItemType.FeatureFile,
  unsafeNonEmptyStringOf('3'),
  'remove_from_cart.feature',
  '',
  unsafeNonEmptyStringOf('features/cart/remove_from_cart.feature'),
  cartDirectory.itemId,
);
const removeFromCartFeature = fileContentItemOf(
  FileContentItemType.Feature,
  unsafeNonEmptyStringOf('4'),
  'Remove from cart',
  '',
  cartDirectory.itemId,
  { relativeLocation: unsafeIntOf(1) },
);
const removeFromCartSessionTimeout = fileContentItemOf(
  FileContentItemType.Scenario,
  unsafeNonEmptyStringOf('5'),
  'Session timeout',
  '',
  cartDirectory.itemId,
  { relativeLocation: unsafeIntOf(2) },
);

//
// Tests - do I really need these? They are standard lens behaviors... if this is only types
// and lenses... then maybe the only thing I need to test is the validation logic in the codecs...
// and that can be all in one file... except that the test data may be a bit large but I can put
// that in another file...
//
describe('FeatureItem', () => {
  context('getItemId', () => {
    it('gets the item id', () => {
      const originalItem: FeatureItem = featuresDirectory;
      expect(itemId.get(originalItem)).to.equal(originalItem.itemId);
    });
    xit('does not allow item type to be changed', () => {
      throw Error('Not Implemented');
    });
    xit('allows the item name to be changed', () => {
      throw Error('Not Implemented');
    });
  });
});
