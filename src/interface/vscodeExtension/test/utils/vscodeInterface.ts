/* eslint-disable functional/no-class, functional/functional-parameters, functional/no-expression-statement */
/* eslint-disable functional/prefer-type-literal, functional/no-mixed-type, functional/no-return-void */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

// The interface to a class has two parts, the object interface and the static interface

// class Disposable
export interface Disposable {
  dispose: () => any;
}
export interface DisposableClass {
  new (f: Function): Disposable;
}

// type Event<T>
export type Event<T> = (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]) => Disposable;

// class EventEmitter<T>
export interface EventEmitter<T> {
  event: Event<T>;
  dispose: () => void;
  fire: (data?: T) => void;
}
export interface EventEmitterClass<T> {
  new (): EventEmitter<T>;
}

// type ProviderResult<T>
export type ProviderResult<T> = T | undefined | null | Thenable<T | undefined | null>;

// enum TreeItemCollapsibleState
export enum TreeItemCollapsibleState {
  None,
  Collapsed,
  Expanded,
}

// class Uri
export interface Uri {
  authority: string;
  fragment: string;
  fsPath: string;
  path: string;
  query: string;
  scheme: string;
  toJSON: () => any;
  toString: (skipEncoding?: boolean) => string;
  with: (change: { authority: string; fragment: string; path: string; query: string; scheme: string }) => Uri;
}
export interface UriClass {
  new (scheme: string, authority: string, path: string, query: string, fragment: string): Uri;
  file: (path: string) => Uri;
  parse: (value: string, strict?: boolean) => Uri;
}

// class ThemeIcon
export interface ThemeIcon {
  arguments?: any[];
  command: string;
  title: string;
  tooltip?: string;
}

// class TreeItem
export interface TreeItem {
  collapsibleState?: TreeItemCollapsibleState;
  command?: Command;
  contextValue?: string;
  description?: string | boolean;
  iconPath?: string | Uri | { dark: string | Uri; light: string | Uri } | ThemeIcon;
  id?: string;
  label?: string;
  resourceUri?: Uri;
  tooltip?: string | undefined;
}
export interface TreeItemClass {
  new (label: string, collapsibleState?: TreeItemCollapsibleState): TreeItem;
  new (resourceUri: Uri, collapsibleState?: TreeItemCollapsibleState): TreeItem;
}

// class TreeDataProvider<T>
export interface TreeDataProvider<T> {
  onDidChangeTreeData?: Event<T | undefined | null>;
  getChildren: (element?: T) => ProviderResult<T[]>;
  getParent: (element: T) => ProviderResult<T>;
  getTreeItem: (element: T) => TreeItem | Thenable<TreeItem>;
}
export interface TreeDataProviderClass<T> {
  new (): TreeDataProvider<T>;
}

// class Command
export interface Command {
  arguments?: any[];
  command: string;
  title: string;
  tooltip?: string;
}
