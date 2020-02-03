import * as vscode from 'vscode';
import StatusBarTerminalService from './services/statusBarTerminalService';
import LoggingService from './services/loggingService';
import ConfigService from './services/configService';
import TerminalService from './services/terminalService';

export const activate = (context: vscode.ExtensionContext) => {
  vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => StatusBarTerminalService.refreshTerminalItems(context));

  vscode.window.onDidCloseTerminal(() => StatusBarTerminalService.refreshTerminalItems(context));

  vscode.workspace.onDidChangeConfiguration(() => {
    LoggingService.info('Configuration changes detected. Update configuration.');
    ConfigService.refreshConfig();
    StatusBarTerminalService.refreshTerminalItems(context);
  });

  context.subscriptions.push(vscode.commands.registerCommand('extendedTerminalIntegration.createTerminal', () => TerminalService.createTerminal()));

  context.subscriptions.push(
    vscode.commands.registerCommand('extendedTerminalIntegration.closeAllTerminals', () => TerminalService.closeAllTerminals())
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('extendedTerminalIntegration.closeActiveTerminal', () => TerminalService.closeActiveTerminal())
  );

  TerminalService.initializeStartupTerminals();
  StatusBarTerminalService.refreshTerminalItems(context);
};

export const deactivate = () => {};
