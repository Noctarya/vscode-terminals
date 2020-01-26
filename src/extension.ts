import * as vscode from 'vscode';
import statusBarTerminalService from './statusBarTerminalService';
import TerminalService from './terminalService';

export const activate = (context: vscode.ExtensionContext) => {
  vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => statusBarTerminalService.onNewTerminal(context, terminal));

  vscode.window.onDidCloseTerminal(() => statusBarTerminalService.refreshTerminalItems(context));

  vscode.workspace.onDidChangeConfiguration(() => statusBarTerminalService.refreshTerminalItems(context));

  context.subscriptions.push(
    vscode.commands.registerCommand('terminal-statusbar.createTerminal', () => {
      const newTerminal = vscode.window.createTerminal();
      newTerminal.show();
    })
  );

  statusBarTerminalService.refreshTerminalItems(context);
  TerminalService.initializeStartupTerminals();
};

export const deactivate = () => {};
