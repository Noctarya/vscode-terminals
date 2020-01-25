import * as vscode from 'vscode';
import StatusBarTerminalItem from './statusBarTerminalItem';
import { getConfig } from './configService';

let knownTerminalItems: StatusBarTerminalItem[] = [];

const getTerminals = () =>
  vscode.window.terminals.length <= getConfig().maxTerminalIcons
    ? vscode.window.terminals
    : vscode.window.terminals.filter((t, idx) => idx < getConfig().maxTerminalIcons);

const refreshTerminalItems = (context: vscode.ExtensionContext) => {
  knownTerminalItems.forEach(t => t.dispose());
  knownTerminalItems = getTerminals().map((t, idx) => new StatusBarTerminalItem(idx, t));
  knownTerminalItems.forEach(i => i.registerAndShow(context));
};

export const activate = (context: vscode.ExtensionContext) => {
  vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => {
    if (knownTerminalItems.length >= getConfig().maxTerminalIcons) return;
    const newTerminal = new StatusBarTerminalItem(vscode.window.terminals.length - 1, terminal);
    knownTerminalItems.push(newTerminal);
    newTerminal.registerAndShow(context);
  });

  vscode.window.onDidCloseTerminal(() => {
    refreshTerminalItems(context);
  });

  vscode.workspace.onDidChangeConfiguration(() => refreshTerminalItems(context));

  context.subscriptions.push(
    vscode.commands.registerCommand('terminal-statusbar.createTerminal', () => {
      const newTerminal = vscode.window.createTerminal();
      newTerminal.show();
    })
  );

  refreshTerminalItems(context);
};

export const deactivate = () => {};
