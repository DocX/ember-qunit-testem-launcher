import * as vscode from 'vscode';
import { generateTestHash } from './qunit_utilites';
import { findFirstModuleName } from './qunit_test_file_helpers';
import { testemUrlFor } from './testem_helpers';

export function runQUnitTestemCurrentModule(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
  let moduleName = findFirstModuleName(textEditor);
  if (!moduleName) {
      vscode.window.showWarningMessage('No test module found in this file');
      return;
  }

  let moduleId = generateTestHash(moduleName);
  vscode.window.showInformationMessage(`Opening module: ${moduleName} (${moduleId})`);

  let testUrl = testemUrlFor([{moduleId}]);
  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(testUrl));
}

export default [
  { name: 'extension.runQUnitTestemCurrentModule', fn: runQUnitTestemCurrentModule },
];
