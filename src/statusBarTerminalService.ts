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

const onNewTerminal = (context: vscode.ExtensionContext, terminal: vscode.Terminal) => {
  if (!ConfigService.preferLatestTerminals && knownTerminalItems.length >= ConfigService.maxTerminalIcons) return;
  if (ConfigService.preferLatestTerminals && knownTerminalItems.length >= ConfigService.maxTerminalIcons && knownTerminalItems.length > 0) {
    knownTerminalItems[0].dispose();
    knownTerminalItems = knownTerminalItems.filter((t, idx) => idx > 0);
  }
  const newTerminal = new StatusBarTerminalItem(vscode.window.terminals.length - 1, terminal);
  knownTerminalItems.push(newTerminal);
  newTerminal.registerAndShow(context);
};

const refreshTerminalItems = (context: vscode.ExtensionContext) => {
  knownTerminalItems.forEach(t => t.dispose());
  knownTerminalItems = getTerminals().map(i => new StatusBarTerminalItem(i.index, i.terminal));
  knownTerminalItems.forEach(i => i.registerAndShow(context));
};

export default {
  onNewTerminal,
  refreshTerminalItems
};
