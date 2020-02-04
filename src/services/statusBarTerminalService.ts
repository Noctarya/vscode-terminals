import * as vscode from 'vscode';
import StatusBarTerminalItem from '../modal/statusBarTerminalItem';
import ConfigService from './configService';
import TerminalService from './terminalService';
import IndexedTerminal from '../modal/indexedTerminal';

export default class StatusBarTerminalService {
  private static knownTerminalItems: StatusBarTerminalItem[] = [];
  private static refreshIntervalId: NodeJS.Timeout | null = null;
  private static context: vscode.ExtensionContext;

  private static getTerminals = (): IndexedTerminal[] => {
    const allTerminals = TerminalService.getAllTerminals().filter(t =>
      ConfigService.filterMode === 'blacklist' ? !ConfigService.filterItems.includes(t.name) : ConfigService.filterItems.includes(t.name)
    );
    return allTerminals.length <= ConfigService.maxTerminalIcons
      ? allTerminals
      : ConfigService.preferLatestTerminals
      ? allTerminals.filter((t, idx) => idx >= allTerminals.length - ConfigService.maxTerminalIcons)
      : allTerminals.filter((t, idx) => idx < ConfigService.maxTerminalIcons);
  };

  public static initializeStatusBarItems = (context: vscode.ExtensionContext) => {
    StatusBarTerminalService.context = context;
    StatusBarTerminalService.refresh();
  };

  private static refresh = () => {
    if (StatusBarTerminalService.refreshIntervalId) clearInterval(StatusBarTerminalService.refreshIntervalId);
    const usedTerminals = StatusBarTerminalService.getTerminals();
    if (StatusBarTerminalService.knownTerminalItems.length !== usedTerminals.length) StatusBarTerminalService.reasignTerminalItems();
    else StatusBarTerminalService.reasignTerminals(usedTerminals);
    StatusBarTerminalService.refreshIntervalId = setInterval(StatusBarTerminalService.refresh, ConfigService.refreshTerminalNameInterval * 1000);
  };

  private static reasignTerminals = (terminals: IndexedTerminal[]): void => {
    StatusBarTerminalService.knownTerminalItems.forEach((t, idx) => {
      // eslint-disable-next-line no-param-reassign
      t.terminal = terminals[idx];
    });
  };

  public static reasignTerminalItems = () => {
    StatusBarTerminalService.knownTerminalItems.forEach(t => t.dispose());
    StatusBarTerminalService.knownTerminalItems = StatusBarTerminalService.getTerminals().map(t => new StatusBarTerminalItem(t));
    StatusBarTerminalService.knownTerminalItems.forEach(i => i.registerAndShow(StatusBarTerminalService.context));
  };
}
