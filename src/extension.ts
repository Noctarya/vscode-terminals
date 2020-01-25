import * as vscode from 'vscode';
// eslint-disable-next-line import/no-unresolved
import StatusBarTerminalItem from './statusBarTerminalItem';

let knownTerminalItems: StatusBarTerminalItem[] = [];

const refreshTerminalItems = (context: vscode.ExtensionContext) => {
  knownTerminalItems.forEach(t => t.dispose());
  knownTerminalItems = vscode.window.terminals.map((t, idx) => new StatusBarTerminalItem(idx, t));
  knownTerminalItems.forEach(i => i.registerAndShow(context));
};

export const activate = (context: vscode.ExtensionContext) => {
  vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => {
    const newTerminal = new StatusBarTerminalItem(vscode.window.terminals.length - 1, terminal);
    knownTerminalItems.push(newTerminal);
    newTerminal.registerAndShow(context);
  });

  vscode.window.onDidCloseTerminal(() => {
    refreshTerminalItems(context);
  });

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World!');
    })
  );

  refreshTerminalItems(context);
};

export const deactivate = () => {};
