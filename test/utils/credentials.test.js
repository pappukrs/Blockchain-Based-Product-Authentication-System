const assert = require('assert');
const keytar = require('keytar');
const { storeCredentials, getToken, getAccounts, SERVICE_NAME } = require('../../src/utils/credentials');

suite('Credentials Tests', () => {
    test('should store and retrieve credentials', async () => {
        const username = 'testuser';
        const token = 'test-token';

        await storeCredentials(username, token);
        const storedToken = await getToken(username);
        
        assert.strictEqual(storedToken, token);
    });

    test('should list all accounts', async () => {
        const accounts = await getAccounts();
        assert(Array.isArray(accounts));
    });
});