import * as t from 'io-ts';
import { BehaviorSubject } from 'rxjs';
import { TreeItem } from 'vscode';
import { Item } from '../../application/summary';
import { MessageBus } from '../../framework/messageBus';

export type FeatureSummaryItem = Item;
export type FeatureTreeItem = FeatureSummaryItem & TreeItem;

export const RootDirectory = t.string;
export type RootDirectory = t.TypeOf<typeof RootDirectory>;

export const DirectorySearchPatterns = t.readonlyArray(t.string);
export type DirectorySearchPatterns = t.TypeOf<typeof DirectorySearchPatterns>;

export type FeatureTreeData = {
  readonly rootDirectory: RootDirectory;
  readonly directorySearchPatterns: DirectorySearchPatterns;
  readonly featureTreeItems: ReadonlyArray<FeatureTreeItem>;
};

export type FeatureTree = BehaviorSubject<FeatureTreeData>;

//
// Service and Dependencies
//
export type Dependencies = {
  readonly messageBus: MessageBus;
};

export type State = {
  readonly dependencies: Dependencies | undefined;
};

const initialState: State = {
  dependencies: undefined,
};

export const Service = new BehaviorSubject<State>(initialState);
export type Service = typeof Service;
