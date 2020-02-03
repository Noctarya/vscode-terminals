import * as vscode from 'vscode';
import StatusBarTerminalItem from '../modal/statusBarTerminalItem';
import ConfigService from './configService';

interface IndexedTerminal {
  index: number;
  terminal: vscode.Terminal;
}

export default class StatusBarTerminalService {
  private static knownTerminalItems: StatusBarTerminalItem[] = [];

  private static getTerminals = (): IndexedTerminal[] => {
    const allTerminals = vscode.window.terminals
      .map((t, idx) => ({ index: idx, terminal: t }))
      .filter(t =>
        ConfigService.filterMode === 'blacklist'
          ? !ConfigService.filterItems.includes(t.terminal.name)
          : ConfigService.filterItems.includes(t.terminal.name)
      );
    return allTerminals.length <= ConfigService.maxTerminalIcons
      ? allTerminals
      : ConfigService.preferLatestTerminals
      ? allTerminals.filter((t, idx) => idx >= allTerminals.length - ConfigService.maxTerminalIcons)
      : allTerminals.filter((t, idx) => idx < ConfigService.maxTerminalIcons);
  };

  public static refreshTerminalItems = (context: vscode.ExtensionContext) => {
    StatusBarTerminalService.knownTerminalItems.forEach(t => t.dispose());
    StatusBarTerminalService.knownTerminalItems = StatusBarTerminalService.getTerminals().map(
      i => new StatusBarTerminalItem(i.index + 1, i.terminal)
    );
    StatusBarTerminalService.knownTerminalItems.forEach(i => i.registerAndShow(context));
  };
}
