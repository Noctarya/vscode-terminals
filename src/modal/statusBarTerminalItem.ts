import * as vscode from 'vscode';
import ConfigService from '../services/configService';
import LoggingService from '../services/loggingService';
import IndexedTerminal from './indexedTerminal';

export default class StatusBarTerminalItem {
  private _item: vscode.StatusBarItem;
  private _terminal: IndexedTerminal;

  constructor(terminal: IndexedTerminal) {
    this._item = vscode.window.createStatusBarItem();
    this._terminal = terminal;
    this._item.command = terminal.openCommandId;
    this.setName();
  }

  public set terminal(terminal: IndexedTerminal) {
    this._terminal = terminal;
    this._item.command = terminal.openCommandId;
    this.setName();
  }

  private setName(): void {
    this._item.text = `$(terminal)${
      ConfigService.showTerminalIndex && ConfigService.showTerminalName
        ? `${this._terminal.index}: ${this._terminal.name}`
        : ConfigService.showTerminalIndex
        ? this._terminal.index
        : ConfigService.showTerminalName
        ? this._terminal.name
        : ''
    }`;
    this._item.color = this._terminal.active
      ? new vscode.ThemeColor('extendedTerminalIntegration.statusBar.activeForeground')
      : new vscode.ThemeColor('extendedTerminalIntegration.statusBar.foreground');
  }

  public show(): void {
    this._item.show();
  }

  public dispose(): void {
    this._item.dispose();
  }
}
