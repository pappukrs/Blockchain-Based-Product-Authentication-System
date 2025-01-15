const keytar = require('keytar');

const SERVICE_NAME = 'vscode-multi-github';

async function storeCredentials(username, token) {
    return keytar.setPassword(SERVICE_NAME, username, token);
}

async function getToken(username) {
    return keytar.getPassword(SERVICE_NAME, username);
}

async function getAccounts() {
    return keytar.findCredentials(SERVICE_NAME);
}

module.exports = {
    storeCredentials,
    getToken,
    getAccounts,
    SERVICE_NAME
};