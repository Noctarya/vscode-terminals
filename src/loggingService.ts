import { window } from 'vscode';

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

export default class LoggingService {
  private static outputChannel = window.createOutputChannel('Terminal StatusBar');

  public static info(message: string, data?: object): void {
    LoggingService.logMessage('INFO', message, data);
  }

  public static warn(message: string, data?: object): void {
    LoggingService.logMessage('WARN', message, data);
  }

  public static logError(message: string, data?: object) {
    LoggingService.logMessage('ERROR', message, data);
  }

  private static logMessage(logLevel: LogLevel, message: string, data?: object): void {
    const time = new Date().toLocaleTimeString();
    LoggingService.outputChannel.appendLine(`["${logLevel}" - ${time}] ${message}`);
    if (data) this.logObject(data);
  }

  private static logObject(data: object): void {
    LoggingService.outputChannel.appendLine(`  value: ${JSON.stringify(data)}`);
  }
}
