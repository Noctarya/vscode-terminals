import * as vscode from 'vscode';
import StartupTerminal from '../config/startupTerminal';
import ConfigService from './configService';
import LoggingService from './loggingService';
import IndexedTerminal from '../modal/indexedTerminal';
import CommandService from './commandService';

export default class TerminalService {
  private static _allTerminals: IndexedTerminal[] = [];
  private static _context: vscode.ExtensionContext;

  public static initializeTerminals(context: vscode.ExtensionContext): void {
    this._context = context;
    this.initializeStartupTerminals();
    this.determineTerminals();
    vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => {
      const idx = vscode.window.terminals.length;
      if (this._allTerminals.every(t => t.index !== idx)) this._allTerminals.push(this.createAndRegisterNewTerminal(idx, terminal));
    });
    vscode.window.onDidCloseTerminal(() => this.determineTerminals());
  }

  private static initializeStartupTerminals(): void {
    ConfigService.startupTerminals.forEach(st => TerminalService.openStartupTerminal(st));
  }

  private static openStartupTerminal(terminal: StartupTerminal): void {
    if (!vscode.window.terminals.find(t => t.name === terminal.id)) {
      LoggingService.info('Create startup terminal:', terminal);
      const newTerminal = vscode.window.createTerminal(terminal.id);
      terminal.startupCommands.forEach(c => newTerminal.sendText(c));
    } else {
      LoggingService.warn(`A terminal process with the name ${terminal.id} already exists. The following terminal is not created:`, terminal);
    }
  }

  private static determineTerminals(): void {
    this._allTerminals = vscode.window.terminals.map((t, idx) => this.createAndRegisterNewTerminal(idx + 1, t));
  }

  private static createAndRegisterNewTerminal(idx: number, terminal: vscode.Terminal): IndexedTerminal {
    const commandId = CommandService.getNextAnonymousCommand();
    this._context.subscriptions.push(
      vscode.commands.registerCommand(commandId, () => {
        terminal.show();
      })
    );
    return IndexedTerminal.create(idx, terminal, commandId);
  }

  public static createTerminal(): void {
    const newTerminal = vscode.window.createTerminal();
    newTerminal.show();
  }

  public static closeActiveTerminal(): void {
    const terminal = vscode.window.activeTerminal;
    if (terminal) {
      LoggingService.info(`Close active terminal ${terminal.name}`);
      terminal.dispose();
    } else {
      LoggingService.warn('No active terminal detected. Command "Close Active Termin" abort.');
    }
  }

  public static closeAllTerminals(): void {
    vscode.window.terminals.forEach((t, idx) => {
      LoggingService.info(`Close terminal ${idx + 1}: ${t.name}.`);
      t.dispose();
    });
  }

  public static get allTerminals(): IndexedTerminal[] {
    return this._allTerminals;
  }
}
