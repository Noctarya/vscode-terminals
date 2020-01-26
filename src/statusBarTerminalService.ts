import * as vscode from 'vscode';
import StatusBarTerminalItem from './statusBarTerminalItem';
import ConfigService from './configService';

interface IndexedTerminal {
  index: number;
  terminal: vscode.Terminal;
}

let knownTerminalItems: StatusBarTerminalItem[] = [];

const getTerminals = (): IndexedTerminal[] => {
  const allTerminals = vscode.window.terminals.map((t, idx) => ({ index: idx, terminal: t }));
  return allTerminals.length <= ConfigService.maxTerminalIcons
    ? allTerminals
    : ConfigService.preferLatestTerminals
    ? allTerminals.filter((t, idx) => idx >= vscode.window.terminals.length - ConfigService.maxTerminalIcons)
    : allTerminals.filter((t, idx) => idx < ConfigService.maxTerminalIcons);
};

const refreshTerminalItems = (context: vscode.ExtensionContext) => {
  knownTerminalItems.forEach(t => t.dispose());
  knownTerminalItems = getTerminals().map(i => new StatusBarTerminalItem(i.index, i.terminal));
  knownTerminalItems.forEach(i => i.registerAndShow(context));
};

export default {
  refreshTerminalItems
};
