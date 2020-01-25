import * as vscode from 'vscode';
import { getConfig } from './configService';

let curId = 0;
const getNextCommandId = () => `terminal-statusbar.anonymous-command.${curId++}`;

export default class StatusBarTerminalItem {
  private _item: vscode.StatusBarItem;
  private _terminal: vscode.Terminal;

  constructor(idx: number, terminal: vscode.Terminal) {
    this._item = vscode.window.createStatusBarItem();
    this._terminal = terminal;
    const config = getConfig();
    this._item.text = `$(terminal)${
      config.showTerminalIndex && config.showTerminalName
        ? `${idx + 1}: ${terminal.name}`
        : config.showTerminalIndex
        ? idx + 1
        : config.showTerminalName
        ? terminal.name
        : ''
    }`;
  }

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
