// import { TreeItemCollapsibleState } from 'vscode';
// import { unsafeNonEmptyStringOf, unsafeIntOf } from '../../test/utils/unsafeBaseTypes';
// import { uriParserStub } from '../test/utils/stubs';
// import { fileItemOf, FileItemType } from './FeatureItem';
// import { featureTreeItemOf, featureItem } from './FeatureTreeItem';

describe('FeatureTreeItem', () => {
  it.todo('should ');
});

//
// Test Data
//

// const featuresDirectory = fileItemOf(
//   FileItemType.FeatureDirectory,
//   unsafeNonEmptyStringOf('0'),
//   'features',
//   '',
//   unsafeNonEmptyStringOf('features'),
//   undefined,
// );
// const accountDirectory = fileItemOf(
//   FileItemType.FeatureDirectory,
//   unsafeNonEmptyStringOf('4'),
//   'account',
//   '',
//   unsafeNonEmptyStringOf('features/account'),
//   featuresDirectory.itemId,
// );

// describe('FeatureTreeItem', () => {
//   context('featureTreeItemOf', () => {
//     it('Sets the icon string correctly based on the item type', () => {
//       const treeItem = featureTreeItemOf(uriParserStub, featuresDirectory, TreeItemCollapsibleState.Expanded);
//       expect(treeItem.iconPath).to.deep.equal({
//         dark: 'resources/dark/feature_directory.svg',
//         light: 'resources/light/feature_directory.svg',
//       });
//     });
//   });
//   context('featureItem.get', () => {
//     it('Gets the feature item', () => {
//       const treeItem = featureTreeItemOf(uriParserStub, accountDirectory, TreeItemCollapsibleState.Expanded);
//       expect(featureItem.get(treeItem)).to.deep.equal(accountDirectory);
//     });
//   });
//   context('featureItem.set', () => {
//     it('Returns a new tree item when you change the feature item', () => {
//       const treeItem = featureTreeItemOf(uriParserStub, accountDirectory, TreeItemCollapsibleState.Expanded);
//       const newTreeItem = featureItem.set(featuresDirectory)(treeItem);
//       expect(newTreeItem).to.not.equal(treeItem);
//     });
//     it('Optimizes to return the same tree item if you change the feautre item to the same object', () => {
//       const treeItem = featureTreeItemOf(uriParserStub, accountDirectory, TreeItemCollapsibleState.Expanded);
//       const newTreeItem = featureItem.set(accountDirectory)(treeItem);
//       expect(newTreeItem).to.equal(treeItem);
//     });
//     it('Sets the feature item in a new FeatureTreeItem', () => {
//       const treeItem = featureTreeItemOf(uriParserStub, accountDirectory, TreeItemCollapsibleState.Expanded);
//       const newTreeItem = featureItem.set(accountDirectory)(treeItem);
//       expect(newTreeItem.featureItem).to.deep.equal(treeItem.featureItem);
//     });
//   });
// });
