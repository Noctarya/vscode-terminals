import * as vscode from 'vscode';
import StartupTerminal from './config/startupTerminal';
import ConfigService from './configService';
import LoggingService from './loggingService';

export default class TerminalService {
  public static initializeStartupTerminals = () => {
    ConfigService.startupTerminals.forEach(st => TerminalService.openStartupTerminal(st));
  };

  private static openStartupTerminal(terminal: StartupTerminal) {
    if (!vscode.window.terminals.find(t => t.name === terminal.id)) {
      LoggingService.info('Create startup terminal:', terminal);
      const newTerminal = vscode.window.createTerminal(terminal.id);
      if (terminal.startupCommand) newTerminal.sendText(terminal.startupCommand);
    }
  }

  public static createTerminal() {
    const newTerminal = vscode.window.createTerminal();
    newTerminal.show();
  }

  public static closeAllTerminals() {
    vscode.window.terminals.forEach((t, idx) => {
      LoggingService.info(`Close terminal ${idx + 1}: ${t.name}.`);
      t.dispose();
    });
  }
}
