import * as vscode from 'vscode';

export interface TerminalStatusBarConfig {
  showTerminalIndex: boolean;
  showTerminalName: boolean;
}

export const getConfig = (): TerminalStatusBarConfig => vscode.workspace.getConfiguration('terminalStatusBar') as any;
