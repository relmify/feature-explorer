describe('FeatureTreeDataProvider', () => {
  test.todo('should ');
});

//
// Test Data
//

// // top level features directory
// const featuresDirectory = fileItemOf(
//   FileItemType.FeatureDirectory,
//   unsafeNonEmptyStringOf('0'),
//   'features',
//   '',
//   unsafeNonEmptyStringOf('features'),
// );

// // cart features
// const cartDirectory = fileItemOf(
//   FileItemType.FeatureDirectory,
//   unsafeNonEmptyStringOf('1'),
//   'cart',
//   '',
//   unsafeNonEmptyStringOf('feature-explorer:features/cart'),
//   featuresDirectory.itemId,
// );
// const addToCartFeatureFile = fileItemOf(
//   FileItemType.FeatureFile,
//   unsafeNonEmptyStringOf('2'),
//   'add_to_cart.feature',
//   'Warning: no scenarios',
//   unsafeNonEmptyStringOf('feature-explorer:feature/cart/add_to_cart.feature'),
//   cartDirectory.itemId,
// );
// const removeFromCartFeatureFile = fileItemOf(
//   FileItemType.FeatureFile,
//   unsafeNonEmptyStringOf('3'),
//   'remove_from_cart.feature',
//   '',
//   unsafeNonEmptyStringOf('feature-explorer:feature/cart/remove_from_cart.feature'),
//   cartDirectory.itemId,
// );

// // account features
// const accountDirectory = fileItemOf(
//   FileItemType.FeatureDirectory,
//   unsafeNonEmptyStringOf('4'),
//   'account',
//   '',
//   unsafeNonEmptyStringOf('feature-explorer:features/account'),
//   featuresDirectory.itemId,
// );
// const depositFeatureFile = fileItemOf(
//   FileItemType.FeatureFile,
//   unsafeNonEmptyStringOf('5'),
//   'deposit.feature',
//   '',
//   unsafeNonEmptyStringOf('feature-explorer:features/account/deposit.feature'),
//   accountDirectory.itemId,
// );
// const withdrawFeatureFile = fileItemOf(
//   FileItemType.FeatureFile,
//   unsafeNonEmptyStringOf('6'),
//   'withdraw.feature',
//   '',
//   unsafeNonEmptyStringOf('feature-explorer:features/account/withdraw.feature'),
//   accountDirectory.itemId,
// );
// const getBalanceFeatureFile = fileItemOf(
//   FileItemType.FeatureFile,
//   unsafeNonEmptyStringOf('7'),
//   'get-balance.feature',
//   '',
//   unsafeNonEmptyStringOf('feature-explorer:features/account/get-balance.feature'),
//   accountDirectory.itemId,
// );

// const featureItems = [
//   featuresDirectory,
//   cartDirectory,
//   addToCartFeatureFile,
//   removeFromCartFeatureFile,
//   accountDirectory,
//   depositFeatureFile,
//   withdrawFeatureFile,
//   getBalanceFeatureFile,
// ];

// //
// // Tests
// //

// describe('FeatureTreeDataProvider', () => {
//   describe('getAll', () => {
//     it('returns an empty array if no feature items are provided', () => {
//       const emptyProvider = new FeatureTreeDataProvider(uriParserStub, eventEmitterStub);
//       expect(emptyProvider.getAll()).to.have.deep.members([]);
//     });
//     it('returns all feature items if feature items are provided', () => {
//       const provider = new FeatureTreeDataProvider(uriParserStub, eventEmitterStub, featureItems);
//       expect(provider.getAll()).to.have.deep.members(featureItems);
//     });
//   });
//   describe('getChildren', () => {
//     let provider: FeatureTreeDataProvider;
//     beforeEach(() => {
//       provider = new FeatureTreeDataProvider(uriParserStub, eventEmitterStub, featureItems);
//     });
//     it('returns an empty array if the item has no children', () => {
//       expect(provider.getChildren(addToCartFeatureFile)).to.deep.equal([]);
//     });
//     it('retuns all children if the item has children', () => {
//       expect(provider.getChildren(accountDirectory)).to.have.deep.members([
//         depositFeatureFile,
//         withdrawFeatureFile,
//         getBalanceFeatureFile,
//       ]);
//     });
//     it('does not return indirect children', () => {
//       expect(provider.getChildren(featuresDirectory)).not.to.have.deep.members([
//         depositFeatureFile,
//         removeFromCartFeatureFile,
//       ]);
//     });
//   });
//   describe('getParent', () => {
//     let provider: FeatureTreeDataProvider;
//     beforeEach(() => {
//       provider = new FeatureTreeDataProvider(uriParserStub, eventEmitterStub, featureItems);
//     });
//     it('returns undefined if the item has no parent', () => {
//       expect(provider.getParent(featuresDirectory)).to.be.undefined;
//     });
//     it('retuns the parent item if the item has a parent', () => {
//       expect(provider.getParent(depositFeatureFile)).to.deep.equal(accountDirectory);
//     });
//   });
// });
