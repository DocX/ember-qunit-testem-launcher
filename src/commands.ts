import * as vscode from 'vscode';
import { generateTestHash } from './qunit_utilites';
import { findFirstModuleName } from './qunit_test_file_helpers';
import { testemUrlFor, checkTestemIsRunning, waitForTestemServer } from './testem_helpers';
import TerminalManager from './terminal';

const TERMINAL_NAME = 'Testem Server';

export function openModuleUrl(textEditor: vscode.TextEditor, terminalManager: any) {
  let moduleName = findFirstModuleName(textEditor);
  if (!moduleName) {
      vscode.window.showWarningMessage('No module find in this file');
      return;
  }

  let moduleId = generateTestHash(moduleName);
  vscode.window.showInformationMessage(`Opening module: ${moduleName} (${moduleId})`);

  let testUrl = testemUrlFor([{moduleId}]);
  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(testUrl));
}

export async function startTestemServer(terminalManager: TerminalManager) {
  if (await checkTestemIsRunning()) {
    vscode.window.showInformationMessage('Server appears to be running already...');
    return;
  }

  let terminal = terminalManager.getOrCreateTerminal(TERMINAL_NAME);
  if (!terminal) {
    vscode.window.showWarningMessage('You have to open workspace first before starting server');
    return;
  }
  terminalManager.runCommand(terminal, 'script/test -s');
  terminal.show();
  vscode.window.showInformationMessage('Starting Testem server in integrated Terminal...');
  return await waitForTestemServer((ms) => vscode.window.showInformationMessage(`Waiting for Testem server to run (${ms/1000}s)...`));
}

export async function startServerAndOpenModuleUrl(textEditor: vscode.TextEditor, terminalManager: any) {
  let started = await startTestemServer(terminalManager);
  if (started) {
    openModuleUrl(textEditor, terminalManager);
  } else {
    vscode.window.showWarningMessage('Starting Testem server timed out');
  }
}
