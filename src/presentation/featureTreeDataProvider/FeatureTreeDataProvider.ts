import { TreeDataProvider, EventEmitter, Event, TreeItemCollapsibleState, Uri } from 'vscode';
import { FeatureItem } from './FeatureItem';
import { FeatureTreeItem, createFeatureTreeItem, itemParent, itemType } from './FeatureTreeItem';
import { FeatureTree } from './FeatureTree';
import { mutableArrayOf } from '../../common/utils/array';
import equal = require('fast-deep-equal');

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
  private readonly uriParser: (uriString: string) => Uri;
  private readonly eventEmitter: EventEmitter<FeatureItem | undefined>;
  readonly onDidChangeTreeData: Event<FeatureItem | undefined>;

  private readonly featureTree: FeatureTree;

  constructor(
    uriParser: (uriString: string) => Uri,
    eventEmitter: EventEmitter<FeatureItem | undefined>,
    featureTree: FeatureTree,
  ) {
    this.uriParser = uriParser;
    this.eventEmitter = eventEmitter;
    this.onDidChangeTreeData = eventEmitter.event;
    this.featureTree = featureTree;
  }

  refresh(): void {
    this.eventEmitter.fire();
  }

  getTreeItem(item: FeatureItem): FeatureTreeItem {
    return createFeatureTreeItem(this.uriParser, item, TreeItemCollapsibleState.Collapsed);
  }

  getChildren(item?: FeatureItem): FeatureItem[] {
    return item
      ? (this.featureTree
          .getValue()
          .featureTreeItems.filter(currentItem => equal(itemParent.get(currentItem), item.itemId)) as Array<
          FeatureItem
        >)
      : (this.featureTree
          .getValue()
          .featureTreeItems.filter(currentItem => itemParent.get(currentItem) === undefined) as Array<FeatureItem>);
  }

  getParent(item: FeatureItem): FeatureItem | undefined {
    return this.featureTree
      .getValue()
      .featureTreeItems.filter(currentItem => equal(itemType.get(currentItem), item.itemParent))[0];
  }

  getAll(): FeatureItem[] {
    return mutableArrayOf(this.featureTree.getValue().featureTreeItems);
  }
}
