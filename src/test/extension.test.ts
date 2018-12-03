import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as sinon from 'sinon';
import { runQUnitTestemCurrentModule } from '../commands';

async function runCommandInFileEditor(filePath: string) {
    let document = await vscode.workspace.openTextDocument(filePath);
    let textEditor = await vscode.window.showTextDocument(document);

    await textEditor.edit(editBuilder => {
        runQUnitTestemCurrentModule(textEditor, editBuilder);
    });
}

suite("Commands Tests", function () {
    test("runQUnitTestemCurrentModule with one module in file", async function() {
        let filePath = path.join(__dirname, '..', '..', 'src', 'test', 'fixtures', 'single_module.js');
        let commandSpy = sinon.spy(vscode.commands, 'executeCommand');

        await runCommandInFileEditor(filePath);

        assert.ok(commandSpy.called, 'open has been called');
        let uri = vscode.Uri.parse('http://localhost:7357/tests/index.html?moduleId=cca93cea');
        assert.deepEqual(commandSpy.firstCall.args, ['vscode.open', uri], 'open has been called with right URL');
        commandSpy.restore();
    });

    test("runQUnitTestemCurrentModule when no module in file", async function() {
        let filePath = path.join(__dirname, '..', '..', 'src', 'test', 'fixtures', 'no_module.js');
        let commandSpy = sinon.spy(vscode.commands, 'executeCommand');

        await runCommandInFileEditor(filePath);

        assert.ok(commandSpy.called === false, 'open has not been called');
        commandSpy.restore();
    });

    test("runQUnitTestemCurrentModule when with multiple modules", async function() {
        let filePath = path.join(__dirname, '..', '..', 'src', 'test', 'fixtures', 'nested_modules.js');
        let commandSpy = sinon.spy(vscode.commands, 'executeCommand');

        await runCommandInFileEditor(filePath);

        assert.ok(commandSpy.called, 'open has been called');
        assert.equal(commandSpy.callCount, 1, 'open has been called');
        let uri = vscode.Uri.parse('http://localhost:7357/tests/index.html?moduleId=cca93cea');
        assert.deepEqual(commandSpy.firstCall.args, ['vscode.open', uri], 'open has been called with right URL');
        commandSpy.restore();
    });
});
