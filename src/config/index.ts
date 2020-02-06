/* eslint-disable class-methods-use-this */
import * as vscode from 'vscode';
import { IsBoolean, IsInt, Min, Max, IsArray, IsIn, Validator } from 'class-validator';
import StartupTerminal from './startupTerminal';

export type FilterMode = 'whitelist' | 'blacklist';

export default class Config {
  public readonly maxTerminalIcons: number;
  public readonly showTerminalIndex: boolean;
  public readonly showTerminalName: boolean;
  public readonly preferLatestTerminals: boolean;
  public readonly startupTerminals: StartupTerminal[];
  public readonly refreshTerminalNameInterval: number;
  public readonly filterMode: FilterMode;
  public readonly filterItems: string[];
  public readonly activeTerminalColor: string;

  constructor(
    maxTerminalIcons: number,
    showTerminalIndex: boolean,
    showTerminalName: boolean,
    preferLatestTerminals: boolean,
    startupTerminals: StartupTerminal[],
    refreshTerminalNameInterval: number,
    filterMode: FilterMode,
    filterItems: string[],
    activeTerminalColor: string
  ) {
    this.maxTerminalIcons = maxTerminalIcons;
    this.showTerminalIndex = showTerminalIndex;
    this.showTerminalName = showTerminalName;
    this.preferLatestTerminals = preferLatestTerminals;
    this.startupTerminals = startupTerminals;
    this.refreshTerminalNameInterval = refreshTerminalNameInterval;
    this.filterMode = filterMode;
    this.filterItems = filterItems;
    this.activeTerminalColor = activeTerminalColor;
  }
}
