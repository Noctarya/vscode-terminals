import * as vscode from 'vscode';
import ConfigService from '../services/configService';
import LoggingService from '../services/loggingService';
import IndexedTerminal from './indexedTerminal';

let curId = 0;
const getNextCommandId = () => `extendedTerminalIntegration.anonymous-command.${curId++}`;

export default class StatusBarTerminalItem {
  private _item: vscode.StatusBarItem;
  private _terminal: IndexedTerminal;

  constructor(terminal: IndexedTerminal) {
    this._item = vscode.window.createStatusBarItem();
    this._terminal = terminal;
    this.showName();
  }

  public set terminal(terminal: IndexedTerminal) {
    this._terminal = terminal;
    this.showName();
  }

  private showName = () => {
    this._item.text = `$(terminal)${
      ConfigService.showTerminalIndex && ConfigService.showTerminalName
        ? `${this._terminal.index}: ${this._terminal.name}`
        : ConfigService.showTerminalIndex
        ? this._terminal.index
        : ConfigService.showTerminalName
        ? this._terminal.name
        : ''
    }`;
  };

  public registerAndShow(context: vscode.ExtensionContext): void {
    this.registerCommand(context);
    this._item.show();
  }

  private registerCommand(context: vscode.ExtensionContext): void {
    const commandId = getNextCommandId();
    this._item.command = commandId;
    context.subscriptions.push(
      vscode.commands.registerCommand(commandId, () => {
        this._terminal.show();
      })
    );
  }

  public dispose(): void {
    this._item.dispose();
  }
}
