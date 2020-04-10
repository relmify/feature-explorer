import * as t from 'io-ts';
import { BehaviorSubject } from 'rxjs';
import { FeatureTreeItem } from './FeatureTreeItem';

const RootPath = t.string;
type RootPath = t.TypeOf<typeof RootPath>;

export type FeatureTreeData = {
  readonly rootPath: RootPath;
  readonly featureTreeItems: ReadonlyArray<FeatureTreeItem>;
};

export type FeatureTree = BehaviorSubject<FeatureTreeData>;

export const createFeatureTree = (
  rootPath: RootPath,
  featureTreeItems: ReadonlyArray<FeatureTreeItem> = [],
): FeatureTree => {
  const data: FeatureTreeData = { rootPath: rootPath, featureTreeItems: featureTreeItems };
  const tree: FeatureTree = new BehaviorSubject<FeatureTreeData>(data);
  return tree;
};
