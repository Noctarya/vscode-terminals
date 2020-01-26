import * as vscode from 'vscode';
import { validate, Validator } from 'class-validator';
import LoggingService from './loggingService';
import Config from './config';
import StartupTerminal from './config/startupTerminal';

const getVsConfig = (property: string) => vscode.workspace.getConfiguration('terminalStatusBar')[property];

export default class ConfigService {
  private static validator: Validator;
  private static config: Config;

  private static _initialize = (() => {
    ConfigService.validator = new Validator();
    ConfigService.refreshConfig();
  })();

  public static refreshConfig(): void {
    ConfigService.config = new Config(
      ConfigService.getAndValidateMaxTerminalIcons(),
      ConfigService.getAndValidateShowTerminalIndex(),
      ConfigService.getAndValidateShowTerminalName(),
      ConfigService.getAndValidatePreferLatestTerminals(),
      ConfigService.getAndValidateStartupTerminals(),
      ConfigService.getAndValidateCloseExistingTerminalsOnStartup()
    );
    LoggingService.info('Configuration currently used:', ConfigService.config);
  }

  private static getAndValidateMaxTerminalIcons(): number {
    const value = getVsConfig('maxTerminalIcons');
    if (ConfigService.validator.isInt(value) && ConfigService.validator.min(value, 0) && ConfigService.validator.max(value, 99)) return value;
    LoggingService.warn('terminalStatusBar.maxTerminalIcons is not a valid number between 0 and 99. Use Default instead.', {
      'terminalStatusBar.maxTerminalIcons': value
    });
    return 15;
  }

  private static getAndValidateShowTerminalIndex(): boolean {
    const value = getVsConfig('showTerminalIndex');
    if (ConfigService.validator.isBoolean(value)) return value;
    LoggingService.warn('terminalStatusBar.showTerminalIndex is not a valid boolean. Use Default instead.', {
      'terminalStatusBar.showTerminalIndex': value
    });
    return true;
  }

  private static getAndValidateShowTerminalName(): boolean {
    const value = getVsConfig('showTerminalName');
    if (ConfigService.validator.isBoolean(value)) return value;
    LoggingService.warn('terminalStatusBar.showTerminalName is not a valid boolean. Use Default instead.', {
      'terminalStatusBar.showTerminalName': value
    });
    return false;
  }

  private static getAndValidatePreferLatestTerminals(): boolean {
    const value = getVsConfig('preferLatestTerminals');
    if (ConfigService.validator.isBoolean(value)) return value;
    LoggingService.warn('terminalStatusBar.preferLatestTerminals is not a valid boolean. Use Default instead.', {
      'terminalStatusBar.preferLatestTerminals': value
    });
    return false;
  }

  private static getAndValidateStartupTerminals(): StartupTerminal[] {
    const value = getVsConfig('startupTerminals');
    if (ConfigService.validator.isArray(value) && value.every((t: any) => ConfigService.isValidStartupTerminal(t))) return value;
    LoggingService.warn('terminalStatusBar.startupTerminals is not a valid array of { id: string, startupCommand?: string }. Use Default instead.', {
      'terminalStatusBar.startupTerminals': value
    });
    return [];
  }

  private static isValidStartupTerminal(value: StartupTerminal): boolean {
    return (
      ConfigService.validator.isString(value.id) &&
      ConfigService.validator.isNotEmpty(value.id) &&
      (value.startupCommand === undefined ||
        (ConfigService.validator.isString(value.startupCommand) && ConfigService.validator.isNotEmpty(value.startupCommand)))
    );
  }

  private static getAndValidateCloseExistingTerminalsOnStartup(): boolean {
    const value = getVsConfig('closeExistingTerminalsOnStartup');
    if (ConfigService.validator.isBoolean(value)) return value;
    LoggingService.warn('terminalStatusBar.closeExistingTerminalsOnStartup is not a valid boolean. Use Default instead.', {
      'terminalStatusBar.closeExistingTerminalsOnStartup': value
    });
    return false;
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

  public static get closeExistingTerminalsOnStartup(): boolean {
    return ConfigService.config.closeExistingTerminalsOnStartup;
  }
}
