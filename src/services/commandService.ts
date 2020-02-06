export default class CommandService {
  private static curId: number = 0;

  public static getNextAnonymousCommand(): string {
    return `extendedTerminalIntegration.anonymous-command.${this.curId++}`;
  }
}
