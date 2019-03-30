'use strict';
import * as vscode from 'vscode';

export default class TerminalManager {
  constructor() {
    vscode.window.onDidCloseTerminal((terminal) => this.onDidCloseTerminal(terminal));
  }

  activeTerminals: { [index:string]: vscode.Terminal } = {};

  private onDidCloseTerminal(terminal: vscode.Terminal) {
    if (this.activeTerminals[terminal.name]) {
      delete this.activeTerminals[terminal.name];
    }
  }

  getOrCreateTerminal(prefix: string): vscode.Terminal | undefined {
    if (!vscode.workspace.name) {
      return undefined;
    }
    const terminalName = [prefix, vscode.workspace.name].join(' ');

    if (this.activeTerminals[terminalName]) {
        return this.activeTerminals[terminalName];
    } else {
        const terminal = vscode.window.createTerminal(terminalName);
        this.activeTerminals[terminalName] = terminal;
        return terminal;
    }
  }

  runCommand(terminal: vscode.Terminal, command: string): void {
    terminal.sendText(command);
  }

}
