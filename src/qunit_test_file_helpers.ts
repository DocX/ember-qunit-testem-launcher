import * as vscode from 'vscode';

const MODULE_REGEXP = /^\s*module\(['"]([^'"]+)['"]/;

export function findFirstModuleName(textEditor: vscode.TextEditor) {
    for (let lineNumber = 0; lineNumber < textEditor.document.lineCount; lineNumber++) {
        let lineText = textEditor.document.lineAt(lineNumber);
        let match = MODULE_REGEXP.exec(lineText.text);
        if (match) {
            return match[1];
        }
    }
}
