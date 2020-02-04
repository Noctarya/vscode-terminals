import * as vscode from 'vscode';
import StatusBarTerminalService from './services/statusBarTerminalService';
import LoggingService from './services/loggingService';
import ConfigService from './services/configService';
import TerminalService from './services/terminalService';

export const activate = (context: vscode.ExtensionContext) => {
  TerminalService.initializeStartupTerminals();
  StatusBarTerminalService.initializeStatusBarItems(context);

  vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => StatusBarTerminalService.reasignTerminalItems());

  vscode.window.onDidCloseTerminal(() => StatusBarTerminalService.reasignTerminalItems());

  vscode.workspace.onDidChangeConfiguration(() => {
    LoggingService.info('Configuration changes detected. Update configuration.');
    ConfigService.refreshConfig();
    StatusBarTerminalService.reasignTerminalItems();
  });

  context.subscriptions.push(vscode.commands.registerCommand('extendedTerminalIntegration.createTerminal', () => TerminalService.createTerminal()));

  context.subscriptions.push(
    vscode.commands.registerCommand('extendedTerminalIntegration.closeAllTerminals', () => TerminalService.closeAllTerminals())
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('extendedTerminalIntegration.closeActiveTerminal', () => TerminalService.closeActiveTerminal())
  );
};

export const deactivate = () => {};
