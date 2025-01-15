const vscode = require('vscode');
const { getAccounts, getToken } = require('../utils/credentials');

async function pushWithAccount() {
    try {
        const accounts = await getAccounts();
        
        if (accounts.length === 0) {
            vscode.window.showErrorMessage(
                'No GitHub accounts found. Please add an account first.'
            );
            return;
        }

        const selected = await vscode.window.showQuickPick(
            accounts.map(acc => acc.account),
            {
                placeHolder: 'Select GitHub account to push with'
            }
        );

        if (!selected) return;

        await executeGitPush(selected);
    } catch (error) {
        vscode.window.showErrorMessage(
            `Failed to push: ${error.message}`
        );
    }
}

async function executeGitPush(username) {
    const token = await getToken(username);
    const gitConfig = vscode.workspace.getConfiguration('git');
    await gitConfig.update('oauth.github', token, true);

    const terminal = vscode.window.createTerminal('GitHub Push');
    terminal.sendText('git push');
    terminal.show();
}

module.exports = { pushWithAccount, executeGitPush };