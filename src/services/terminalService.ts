import * as vscode from 'vscode';
import StartupTerminal from '../config/startupTerminal';
import ConfigService from './configService';
import LoggingService from './loggingService';
import IndexedTerminal from '../modal/indexedTerminal';

export default class TerminalService {
  public static getAllTerminals = (): IndexedTerminal[] => {
    return vscode.window.terminals.map((t, idx) => IndexedTerminal.create(idx + 1, t));
  };

  public static initializeStartupTerminals = () => {
    ConfigService.startupTerminals.forEach(st => TerminalService.openStartupTerminal(st));
  };

  private static openStartupTerminal(terminal: StartupTerminal) {
    if (!vscode.window.terminals.find(t => t.name === terminal.id)) {
      LoggingService.info('Create startup terminal:', terminal);
      const newTerminal = vscode.window.createTerminal(terminal.id);
      if (terminal.startupCommand) newTerminal.sendText(terminal.startupCommand);
    } else {
      LoggingService.warn(`A terminal process with the name ${terminal.id} already exists. The following terminal is not created:`, terminal);
    }
  }

  public static createTerminal() {
    const newTerminal = vscode.window.createTerminal();
    newTerminal.show();
  }

  public static closeActiveTerminal() {
    const terminal = vscode.window.activeTerminal;
    if (terminal) {
      LoggingService.info(`Close active terminal ${terminal.name}`);
      terminal.dispose();
    } else {
      LoggingService.warn('No active terminal detected. Command "Close Active Termin" abort.');
    }
  }

  public static closeAllTerminals() {
    vscode.window.terminals.forEach((t, idx) => {
      LoggingService.info(`Close terminal ${idx + 1}: ${t.name}.`);
      t.dispose();
    });
  }
}
