import * as vscode from 'vscode';
import { generateTestHash } from './qunit_utilites';
import { findFirstModuleName } from './qunit_test_file_helpers';
import { testemUrlFor, checkTestemIsRunning, waitForTestemServer } from './testem_helpers';
import TerminalManager from './terminal_manager';

const TERMINAL_NAME = 'Testem Server';

export function openModuleUrl(textEditor: vscode.TextEditor, terminalManager: any) {
  let moduleName = findFirstModuleName(textEditor);
  if (!moduleName) {
      vscode.window.showWarningMessage('No test module found in this file');
      return;
  }

  let moduleId = generateTestHash(moduleName);
  vscode.window.showInformationMessage(`Opening module: ${moduleName} (${moduleId})`);

  let configuration = vscode.workspace.getConfiguration();
  let testUrl = testemUrlFor([{moduleId}], configuration);
  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(testUrl));
}

export async function startTestemServer(terminalManager: TerminalManager) {
  let configuration = vscode.workspace.getConfiguration();
  let testemServerURL = <string> configuration.get('testemLauncher.testemServerURL');

  if (await checkTestemIsRunning(testemServerURL)) {
    vscode.window.showInformationMessage('Server appears to be running already...');
    return;
  }

  let terminal = terminalManager.getOrCreateTerminal(TERMINAL_NAME);
  if (!terminal) {
    vscode.window.showWarningMessage('You have to open workspace first before starting server');
    return;
  }

  let testemStartServerCmd = <string> configuration.get('testemLauncher.testemStartServerCmd');
  terminalManager.runCommand(terminal, testemStartServerCmd);
  terminal.show();
  vscode.window.showInformationMessage('Starting Testem server in integrated Terminal...');
  
  return await waitForTestemServer(
    testemServerURL,
    async (ms, cancel) => {
      let action = await vscode.window.showInformationMessage(
        `Waiting for Testem server to start (${ms/1000}s)...`, 
        'Cancel'
      );
      if (action === 'Cancel') {
        cancel();
      }
    }
  );
}

export async function startServerAndOpenModuleUrl(textEditor: vscode.TextEditor, terminalManager: any) {
  let started = await startTestemServer(terminalManager);
  if (started) {
    openModuleUrl(textEditor, terminalManager);
  } else {
    vscode.window.showWarningMessage('Starting Testem server timed out or was cancelled');
  }
}
