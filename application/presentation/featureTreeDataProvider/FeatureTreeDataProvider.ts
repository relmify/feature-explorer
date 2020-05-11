import { TreeDataProvider, EventEmitter, Event, TreeItemCollapsibleState, Uri } from 'vscode';
import { Item as SummaryItem } from '../../application/summary';
import { SummaryTreeItem, createSummaryTreeItem } from './FeatureTreeItem';
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
export class SummaryTreeDataProvider implements TreeDataProvider<SummaryItem> {
  private readonly uriParser: (uriString: string) => Uri;
  private readonly eventEmitter: EventEmitter<SummaryItem | undefined>;
  readonly onDidChangeTreeData: Event<SummaryItem | undefined>;

  private readonly featureTree: FeatureTree;

  constructor(
    uriParser: (uriString: string) => Uri,
    eventEmitter: EventEmitter<SummaryItem | undefined>,
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

  getTreeItem(item: SummaryItem): SummaryTreeItem {
    return createSummaryTreeItem(this.uriParser, item, TreeItemCollapsibleState.Collapsed);
  }

  getChildren(item?: SummaryItem): SummaryItem[] {
    return item
      ? (this.featureTree
          .getValue()
          .featureTreeItems.filter(currentItem => equal(currentItem.itemParent, item.itemId)) as Array<SummaryItem>)
      : (this.featureTree
          .getValue()
          .featureTreeItems.filter(currentItem => currentItem.itemParent === undefined) as Array<SummaryItem>);
  }

  getParent(item: SummaryItem): SummaryItem | undefined {
    return this.featureTree
      .getValue()
      .featureTreeItems.filter(currentItem => equal(currentItem.itemType, item.itemParent))[0];
  }

  getAll(): SummaryItem[] {
    return mutableArrayOf(this.featureTree.getValue().featureTreeItems);
  }
}
