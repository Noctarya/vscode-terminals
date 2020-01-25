import * as vscode from 'vscode';
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
    vscode.commands.registerCommand('terminal-statusbar.createTerminal', () => {
      const newTerminal = vscode.window.createTerminal();
      newTerminal.show();
    })
  );

  refreshTerminalItems(context);
};

export const deactivate = () => {};
