import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export default class StartupTerminal {
  public readonly id: string;
  public readonly startupCommands: string[];

  constructor(id: string, startupCommands: string[] = []) {
    this.id = id;
    this.startupCommands = startupCommands;
  }
}
