import * as vscode from 'vscode';
import StatusBarTerminalItem from '../modal/statusBarTerminalItem';
import ConfigService from './configService';
import TerminalService from './terminalService';
import IndexedTerminal from '../modal/indexedTerminal';

export default class StatusBarService {
  private static knownTerminalItems: StatusBarTerminalItem[] = [];
  // eslint-disable-next-line no-undef
  private static refreshIntervalId: NodeJS.Timeout | null = null;

  public static initializeStatusBarItems(): void {
    vscode.window.onDidOpenTerminal(() => StatusBarService.reasign());
    vscode.window.onDidCloseTerminal(() => StatusBarService.reasign());
    vscode.window.onDidChangeActiveTerminal(() => StatusBarService.reasign());
    this.refresh();
  }

  private static refresh = (): void => {
    if (StatusBarService.refreshIntervalId) clearInterval(StatusBarService.refreshIntervalId);
    StatusBarService.reasign();
    StatusBarService.refreshIntervalId = setInterval(StatusBarService.refresh, ConfigService.refreshTerminalNameInterval * 1000);
  };

  public static reasign(): void {
    const usedTerminals = this.getTerminals();
    if (this.knownTerminalItems.length !== usedTerminals.length) this.reasignTerminalItems();
    else this.reasignTerminals(usedTerminals);
  }

  private static getTerminals(): IndexedTerminal[] {
    const allTerminals = TerminalService.allTerminals.filter((t) =>
      ConfigService.filterMode === 'blacklist' ? !ConfigService.filterItems.includes(t.name) : ConfigService.filterItems.includes(t.name)
    );
    return allTerminals.length <= ConfigService.maxTerminalIcons
      ? allTerminals
      : ConfigService.preferLatestTerminals
      ? allTerminals.filter((t, idx) => idx >= allTerminals.length - ConfigService.maxTerminalIcons)
      : allTerminals.filter((t, idx) => idx < ConfigService.maxTerminalIcons);
  }

  private static reasignTerminals(terminals: IndexedTerminal[]): void {
    this.knownTerminalItems.forEach((t, idx) => {
      // eslint-disable-next-line no-param-reassign
      t.terminal = terminals[idx];
    });
  }

  private static reasignTerminalItems(): void {
    this.knownTerminalItems.forEach((t) => t.dispose());
    this.knownTerminalItems = this.getTerminals().map((t) => new StatusBarTerminalItem(t));
    this.knownTerminalItems.forEach((i) => i.show());
  }
}
