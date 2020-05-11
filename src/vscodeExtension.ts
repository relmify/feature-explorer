import * as vscode from 'vscode';
import { configureApplication } from './configuration';
import { SummaryItem } from './presentation/featureTreeDataProvider';
import { createFeatureTree } from './presentation/featureTreeDataProvider/FeatureTree';
import { SummaryTreeDataProvider } from './presentation/featureTreeDataProvider/FeatureTreeDataProvider';

/* eslint-disable functional/no-return-void */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-unused-vars */

const getWorkspaceRoot = (): string => {
  return vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.path : '';
};

/**
 * Extension entry point
 *
 * @param context the vscode execution context
 */
export function activate(context: vscode.ExtensionContext): void {
  console.log('The "feature-explorer" extension has been activated');

  configureApplication();
  const workspaceRoot = getWorkspaceRoot();
  const featureTree = createFeatureTree(workspaceRoot);
  const featureTreeDataProvider = new SummaryTreeDataProvider(
    vscode.Uri.parse,
    new vscode.EventEmitter<SummaryItem | undefined>(),
    featureTree,
  );
  const viewSubscription = vscode.window.registerTreeDataProvider('featureExplorer.view', featureTreeDataProvider);

  const commandSubscription = vscode.commands.registerCommand('featureExplorer.refresh', () => {
    // Display a message box to the user
    vscode.window.showInformationMessage('Feature Explorer Refresh Command Executed!');
  });

  context.subscriptions.push(viewSubscription, commandSubscription);
}

/**
 * Called when the extension is deactivated
 */
export function deactivate(): void {
  console.log('The "feature-explorer" extension has been deactivated');
}
