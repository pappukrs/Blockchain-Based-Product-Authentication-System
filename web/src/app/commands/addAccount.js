const vscode = require('vscode');
const { Octokit } = require('@octokit/rest');
const { storeCredentials } = require('../utils/credentials');

async function addAccount() {
    const username = await vscode.window.showInputBox({
        placeHolder: 'Enter GitHub username',
        prompt: 'Please enter your GitHub username'
    });

    if (!username) return;

    const token = await vscode.window.showInputBox({
        placeHolder: 'Enter GitHub personal access token',
        prompt: 'Please enter your GitHub personal access token',
        password: true
    });

    if (!token) return;

    try {
        await validateGitHubToken(username, token);
        await storeCredentials(username, token);
        
        vscode.window.showInformationMessage(
            `Successfully added GitHub account: ${username}`
        );
    } catch (error) {
        vscode.window.showErrorMessage(
            `Failed to add GitHub account: ${error.message}`
        );
    }
}

async function validateGitHubToken(username, token) {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.users.getAuthenticated();
    
    if (data.login !== username) {
        throw new Error('Username does not match the token');
    }
}

module.exports = { addAccount, validateGitHubToken };