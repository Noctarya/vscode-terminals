import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export default class StartupTerminal {
  public readonly id: string;
  public readonly startupCommand?: string;

  constructor(id: string, startupCommand?: string) {
    this.id = id;
    this.startupCommand = startupCommand;
  }
}
