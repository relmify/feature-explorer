import * as vscode from 'vscode';

import { FeatureTreeDataProvider } from './vscodeExtension/featureTreeDataProvider';
import { FeatureItem } from './vscodeExtension/featureTreeDataProvider/FeatureItem';

/* eslint-disable functional/no-return-void */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Extension entry point
 *
 * @param context the vscode execution context
 */
export function activate(context: vscode.ExtensionContext): void {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // This should be done inside some sort of logging abstraction?
  console.log('Congratulations, your extension "feature-explorer" is now active!');

  const eventEmitter = new vscode.EventEmitter<FeatureItem | undefined>();
  const featureTreeDataProvider = new FeatureTreeDataProvider(vscode.Uri.parse, eventEmitter);
  vscode.window.registerTreeDataProvider('featureExplorer', featureTreeDataProvider);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
  });

  context.subscriptions.push(disposable);
}

/**
 * Called when the extension is deactivated
 */
export function deactivate(): void {
  console.log('The "feature-explorer" extension has been deactivated');
}
