import * as vscode from 'vscode';
import StatusBarService from './services/statusBarService';
import LoggingService from './services/loggingService';
import ConfigService from './services/configService';
import TerminalService from './services/terminalService';

export const activate = (context: vscode.ExtensionContext) => {
  TerminalService.initializeTerminals(context);
  StatusBarService.initializeStatusBarItems();

  vscode.workspace.onDidChangeConfiguration(() => {
    LoggingService.info('Configuration changes detected. Update configuration.');
    ConfigService.refreshConfig();
    StatusBarService.reasign();
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
