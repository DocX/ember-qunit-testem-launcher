'use strict';
import * as vscode from 'vscode';
import * as commands from './commands';
import TerminalManager from './terminal';

export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    let terminalManager = new TerminalManager();

    context.subscriptions.push(vscode.commands.registerTextEditorCommand(
        'extension.openModuleUrl',
        (textEditor) => commands.openModuleUrl(textEditor, terminalManager)),
    );
    context.subscriptions.push(vscode.commands.registerCommand(
        'extension.startTestemServer',
        () => commands.startTestemServer(terminalManager)),
    );
    context.subscriptions.push(vscode.commands.registerTextEditorCommand(
        'extension.startServerAndOpenModuleUrl',
        (textEditor) => commands.startServerAndOpenModuleUrl(textEditor, terminalManager)),
    );
}
