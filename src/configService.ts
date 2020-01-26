import * as vscode from 'vscode';

export interface StartupTerminal {
  id: string;
  startupCommand: string;
}

export interface TerminalStatusBarConfig {
  maxTerminalIcons: number;
  showTerminalIndex: boolean;
  showTerminalName: boolean;
  preferLatestTerminals: boolean;
  startupTerminals: StartupTerminal[];
}

export const getConfig = (): TerminalStatusBarConfig => vscode.workspace.getConfiguration('terminalStatusBar') as any;
