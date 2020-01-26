import * as vscode from 'vscode';
import StatusBarTerminalService from './statusBarTerminalService';
import TerminalService from './terminalService';
import ConfigService from './configService';
import LoggingService from './loggingService';

export const activate = (context: vscode.ExtensionContext) => {
  vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => StatusBarTerminalService.onNewTerminal(context, terminal));

  vscode.window.onDidCloseTerminal(() => StatusBarTerminalService.refreshTerminalItems(context));

  vscode.workspace.onDidChangeConfiguration(() => {
    LoggingService.info('Configuration changes detected. Update configuration.');
    ConfigService.refreshConfig();
    StatusBarTerminalService.refreshTerminalItems(context);
  });

  context.subscriptions.push(vscode.commands.registerCommand('terminal-statusbar.createTerminal', () => TerminalService.createTerminal()));

  context.subscriptions.push(vscode.commands.registerCommand('terminal-statusbar.closeAllTerminals', () => TerminalService.closeAllTerminals()));

  context.subscriptions.push(vscode.commands.registerCommand('terminal-statusbar.closeActiveTerminal', () => TerminalService.closeActiveTerminal()));

  StatusBarTerminalService.refreshTerminalItems(context);
  TerminalService.initializeStartupTerminals();
};

export const deactivate = () => {};
