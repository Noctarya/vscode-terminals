import * as vscode from 'vscode';

export default class IndexedTerminal {
  private _index: number;
  private _vsTerminal: vscode.Terminal;
  private _openCommandId: string;

  public static create(index: number, vsTerminal: vscode.Terminal, openCommandId: string): IndexedTerminal {
    return new IndexedTerminal(index, vsTerminal, openCommandId);
  }

  constructor(index: number, vsTerminal: vscode.Terminal, openCommandId: string) {
    this._index = index;
    this._vsTerminal = vsTerminal;
    this._openCommandId = openCommandId;
  }

  public show(): void {
    this._vsTerminal.show();
  }

  public dispose(): void {
    this._vsTerminal.dispose();
  }

  public get name(): string {
    return this._vsTerminal.name;
  }

  public get index(): number {
    return this._index;
  }

  public get openCommandId(): string {
    return this._openCommandId;
  }
}
