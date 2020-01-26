import * as vscode from 'vscode';
// eslint-disable-next-line no-unused-vars
import { getConfig, StartupTerminal } from './configService';

export default class TerminalService {
  public static initializeStartupTerminals = () => {
    getConfig().startupTerminals.forEach(st => TerminalService.openStartupTerminal(st));
  };

  private static openStartupTerminal(terminal: StartupTerminal) {
    if (!vscode.window.terminals.find(t => t.name === terminal.id)) {
      const newTerminal = vscode.window.createTerminal(terminal.id);
      if (terminal.startupCommand) newTerminal.sendText(terminal.startupCommand);
    }
  }
}
