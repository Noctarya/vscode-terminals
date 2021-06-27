import * as vscode from 'vscode';
import { isInt, isBoolean, min, max, isArray, isString, isNotEmpty } from 'class-validator';
import LoggingService from './loggingService';
import Config, { FilterMode } from '../config';
import StartupTerminal from '../config/startupTerminal';

const getVsConfig = (property: string) => vscode.workspace.getConfiguration('extendedTerminalIntegration')[property];
const getStatusBarConfig = (property: string) => getVsConfig('statusBar')[property];

export default class ConfigService {
  private static config: Config;

  private static _initialize = (() => {
    ConfigService.refreshConfig();
  })();

  public static refreshConfig(): void {
    ConfigService.config = new Config(
      ConfigService.getAndValidateMaxTerminalIcons(),
      ConfigService.getAndValidateShowTerminalIndex(),
      ConfigService.getAndValidateShowTerminalName(),
      ConfigService.getAndValidatePreferLatestTerminals(),
      ConfigService.getAndValidateStartupTerminals(),
      ConfigService.getAndValidateRefreshTerminalNameInterval(),
      ConfigService.getAndValidateFilterMode(),
      ConfigService.getAndValidateFilterItems()
    );
    LoggingService.info('Configuration currently used:', ConfigService.config);
  }

  private static getAndValidateMaxTerminalIcons(): number {
    const value = getStatusBarConfig('maxTerminalIcons');
    if (isInt(value) && min(value, 0) && max(value, 99)) return value;
    LoggingService.warn('extendedTerminalIntegration.statusBar.maxTerminalIcons is not a valid number between 0 and 99. Use Default instead.', {
      'extendedTerminalIntegration.statusBar.maxTerminalIcons': value
    });
    return 15;
  }

  private static getAndValidateShowTerminalIndex(): boolean {
    const value = getStatusBarConfig('showTerminalIndex');
    if (isBoolean(value)) return value;
    LoggingService.warn('extendedTerminalIntegration.statusBar.showTerminalIndex is not a valid boolean. Use Default instead.', {
      'extendedTerminalIntegration.statusBar.showTerminalIndex': value
    });
    return true;
  }

  private static getAndValidateShowTerminalName(): boolean {
    const value = getStatusBarConfig('showTerminalName');
    if (isBoolean(value)) return value;
    LoggingService.warn('extendedTerminalIntegration.statusBar.showTerminalName is not a valid boolean. Use Default instead.', {
      'extendedTerminalIntegration.statusBar.showTerminalName': value
    });
    return false;
  }

  private static getAndValidatePreferLatestTerminals(): boolean {
    const value = getStatusBarConfig('preferLatestTerminals');
    if (isBoolean(value)) return value;
    LoggingService.warn('extendedTerminalIntegration.statusBar.preferLatestTerminals is not a valid boolean. Use Default instead.', {
      'extendedTerminalIntegration.statusBar.preferLatestTerminals': value
    });
    return false;
  }

  private static getAndValidateRefreshTerminalNameInterval(): number {
    const value = getStatusBarConfig('refreshTerminalNameInterval');
    if (isInt(value) && min(value, 1) && max(value, 600)) return value;
    LoggingService.warn(
      'extendedTerminalIntegration.statusBar.refreshTerminalNameInterval is not a valid number between 1 and 600. Use Default instead.',
      {
        'extendedTerminalIntegration.statusBar.refreshTerminalNameInterval': value
      }
    );
    return 5;
  }

  private static getAndValidateFilterMode(): FilterMode {
    const value = getStatusBarConfig('filter').mode;
    if (value === 'whitelist' || value === 'blacklist') return value;
    LoggingService.warn('extendedTerminalIntegration.statusBar.filter.mode does not correspond to whitelist or blacklist. Use Default instead.', {
      'extendedTerminalIntegration.statusBar.filter.mode': value
    });
    return 'blacklist';
  }

  private static getAndValidateFilterItems(): string[] {
    const value = getStatusBarConfig('filter').items;
    if (isArray(value) && value.every((i: any) => isString(i) && isNotEmpty(i))) return value;
    LoggingService.warn('extendedTerminalIntegration.statusBar.filter.items is not a valid array of strings. Use Default instead.', {
      'extendedTerminalIntegration.statusBar.filter.items': value
    });
    return [];
  }

  private static getAndValidateStartupTerminals(): StartupTerminal[] {
    const value = getVsConfig('startupTerminals');
    if (isArray(value) && value.every((t: any) => ConfigService.isValidStartupTerminal(t)))
      return value.map((t: any) => new StartupTerminal(t.id, t.startupCommands));
    LoggingService.warn(
      'extendedTerminalIntegration.startupTerminals is not a valid array of { id: string, startupCommands: string[] }. Use Default instead.',
      {
        'extendedTerminalIntegration.startupTerminals': value
      }
    );
    return [];
  }

  private static isValidStartupTerminal(value: StartupTerminal): boolean {
    const isNotEmptyString = (v: any) => isString(v) && isNotEmpty(v);
    return (
      (isNotEmptyString(value.id) && value.startupCommands === undefined) ||
      (isArray(value.startupCommands) && (value.startupCommands.length === 0 || value.startupCommands.every(isNotEmptyString)))
    );
  }

  public static get maxTerminalIcons(): number {
    return ConfigService.config.maxTerminalIcons;
  }

  public static get showTerminalIndex(): boolean {
    return ConfigService.config.showTerminalIndex;
  }

  public static get showTerminalName(): boolean {
    return ConfigService.config.showTerminalName;
  }

  public static get preferLatestTerminals(): boolean {
    return ConfigService.config.preferLatestTerminals;
  }

  public static get startupTerminals(): StartupTerminal[] {
    return ConfigService.config.startupTerminals;
  }

  public static get refreshTerminalNameInterval(): number {
    return ConfigService.config.refreshTerminalNameInterval;
  }

  public static get filterMode(): FilterMode {
    return ConfigService.config.filterMode;
  }

  public static get filterItems(): string[] {
    return ConfigService.config.filterItems;
  }
}
