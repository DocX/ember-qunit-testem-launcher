'use strict';
import * as vscode from 'vscode';
import commands from './commands';

export function activate(context: vscode.ExtensionContext) {
    commands.forEach(({name, fn}) => {
        let disposable = vscode.commands.registerTextEditorCommand(name, fn);
        context.subscriptions.push(disposable);
    });
}
