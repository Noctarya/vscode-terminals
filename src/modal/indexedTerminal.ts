import * as vscode from 'vscode';

export default class IndexedTerminal {
  private _index: number;
  private _vsTerminal: vscode.Terminal;

  public static create(index: number, vsTerminal: vscode.Terminal): IndexedTerminal {
    return new IndexedTerminal(index, vsTerminal);
  }

  constructor(index: number, vsTerminal: vscode.Terminal) {
    this._index = index;
    this._vsTerminal = vsTerminal;
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
}
