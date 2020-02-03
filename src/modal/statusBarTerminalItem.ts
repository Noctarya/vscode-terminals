import * as vscode from 'vscode';
import ConfigService from '../services/configService';
import LoggingService from '../services/loggingService';

let curId = 0;
const getNextCommandId = () => `extendedTerminalIntegration.anonymous-command.${curId++}`;

export default class StatusBarTerminalItem {
  private _item: vscode.StatusBarItem;
  private _terminal: vscode.Terminal;
  private _idx: number;
  private _refreshIntervalId: NodeJS.Timeout | null;

  constructor(idx: number, terminal: vscode.Terminal) {
    this._item = vscode.window.createStatusBarItem();
    this._terminal = terminal;
    this._idx = idx;
    this._refreshIntervalId = null;
    this.refreshName();
  }

  private refreshName = () => {
    if (this._refreshIntervalId) clearInterval(this._refreshIntervalId);
    this._item.text = `$(terminal)${
      ConfigService.showTerminalIndex && ConfigService.showTerminalName
        ? `${this._idx}: ${this._terminal.name}`
        : ConfigService.showTerminalIndex
        ? this._idx
        : ConfigService.showTerminalName
        ? this._terminal.name
        : ''
    }`;
    this._refreshIntervalId = setInterval(this.refreshName, ConfigService.refreshTerminalNameInterval * 1000);
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
    if (this._refreshIntervalId) clearInterval(this._refreshIntervalId);
    this._item.dispose();
  }
}
