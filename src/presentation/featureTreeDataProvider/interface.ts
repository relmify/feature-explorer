import { TreeDataProvider, EventEmitter, Event, TreeItemCollapsibleState, Uri } from 'vscode';
import { mutableArrayOf } from '../../framework/utils/array';
import { FeatureSummaryItem, FeatureTree, FeatureTreeItem } from './domainTypes';
import { createFeatureTreeItem, getItemChildren, getItemParent, getAllItems } from './domain';

/* eslint-disable functional/no-class */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/prefer-readonly-type */

/**
 * Thin wrapper that implements the vscode api for extensions that provide a tree view
 */
export class FeatureTreeDataProvider implements TreeDataProvider<FeatureSummaryItem> {
  private readonly uriParser: (uriString: string) => Uri;
  private readonly eventEmitter: EventEmitter<FeatureSummaryItem | undefined>;
  readonly onDidChangeTreeData: Event<FeatureSummaryItem | undefined>;

  private readonly featureTree: FeatureTree;

  constructor(
    uriParser: (uriString: string) => Uri,
    eventEmitter: EventEmitter<FeatureSummaryItem | undefined>,
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

  getTreeItem(item: FeatureSummaryItem): FeatureTreeItem {
    return createFeatureTreeItem(this.uriParser, item, TreeItemCollapsibleState.Collapsed);
  }

  getChildren(item?: FeatureSummaryItem): FeatureSummaryItem[] {
    return mutableArrayOf(getItemChildren(this.featureTree, item));
  }

  getParent(item: FeatureSummaryItem): FeatureSummaryItem | undefined {
    return getItemParent(this.featureTree, item);
  }

  getAll(): FeatureSummaryItem[] {
    return mutableArrayOf(getAllItems(this.featureTree));
  }
}
