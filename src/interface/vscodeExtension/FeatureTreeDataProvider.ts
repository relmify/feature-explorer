import { TreeDataProvider, EventEmitter, Event, TreeItemCollapsibleState, Uri } from './test/utils/vscodeInterface';
import { FeatureItem, parent, itemId } from './featureTreeDataProvider/FeatureItem';
import { FeatureTreeItem, featureTreeItemOf } from './featureTreeDataProvider/FeatureTreeItem';
import { mutableArrayOf } from '../../utils/array';
import * as equal from 'fast-deep-equal';

// The data provider must conform to the vscode api which is not a functional api
/* eslint-disable functional/no-class */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/prefer-readonly-type */

/**
 * Implements the vscode api for extensions that provide a tree view
 */
export class FeatureTreeDataProvider implements TreeDataProvider<FeatureItem> {
  readonly _uriParser: (uriString: string) => Uri;
  readonly _onDidChangeTreeData: EventEmitter<FeatureItem | undefined>;
  readonly onDidChangeTreeData: Event<FeatureItem | undefined>;

  // TODO - avoid storing mutable state in the class. Store a state observable instead.
  private featureItems: FeatureItem[];

  constructor(
    uriParser: (uriString: string) => Uri,
    eventEmitter: EventEmitter<FeatureItem | undefined>,
    featureItems?: FeatureItem[],
  ) {
    this._uriParser = uriParser;
    this._onDidChangeTreeData = eventEmitter;
    this.onDidChangeTreeData = eventEmitter.event;
    this.featureItems = featureItems ? mutableArrayOf(featureItems) : [];
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(featureItem: FeatureItem): FeatureTreeItem {
    return featureTreeItemOf(this._uriParser, featureItem, TreeItemCollapsibleState.Collapsed);
  }

  getChildren(item?: FeatureItem): FeatureItem[] {
    return item
      ? mutableArrayOf(this.featureItems).filter(currentItem => equal(parent.get(currentItem), item.itemId))
      : mutableArrayOf(this.featureItems).filter(currentItem => parent.get(currentItem) === undefined);
  }

  getParent(item: FeatureItem): FeatureItem | undefined {
    return this.featureItems.filter(currentItem => equal(itemId.get(currentItem), item.parent))[0];
  }

  getAll(): FeatureItem[] {
    return this.featureItems;
  }
}
