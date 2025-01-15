const assert = require('assert');
const { validateGitHubToken } = require('../../src/commands/addAccount');
const { Octokit } = require('@octokit/rest');

suite('Add Account Tests', () => {
    test('validateGitHubToken should throw error for mismatched username', async () => {
        const username = 'testuser';
        const token = 'invalid-token';

        try {
            await validateGitHubToken(username, token);
            assert.fail('Should have thrown an error');
        } catch (error) {
            assert.strictEqual(error.message.includes('Username does not match'), true);
        }
    });
});