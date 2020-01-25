import * as vscode from 'vscode';

export interface TerminalStatusBarConfig {
  maxTerminalIcons: number;
  showTerminalIndex: boolean;
  showTerminalName: boolean;
}

export const getConfig = (): TerminalStatusBarConfig => vscode.workspace.getConfiguration('terminalStatusBar') as any;
