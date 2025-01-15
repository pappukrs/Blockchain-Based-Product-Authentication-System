const vscode = require('vscode');
const { addAccount } = require('./commands/addAccount');
const { pushWithAccount } = require('./commands/push');
const StatusBarManager = require('./ui/statusBar');

function activate(context) {
    const statusBar = new StatusBarManager();

    let addAccountDisposable = vscode.commands.registerCommand(
        'vscode-multi-github.addAccount',
        addAccount
    );

    let pushDisposable = vscode.commands.registerCommand(
        'vscode-multi-github.push',
        pushWithAccount
    );

    context.subscriptions.push(addAccountDisposable);
    context.subscriptions.push(pushDisposable);
    context.subscriptions.push(statusBar);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};