const vscode = require('vscode');

class StatusBarManager {
    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        this.statusBarItem.text = "$(github) GitHub";
        this.statusBarItem.show();
    }

    dispose() {
        if (this.statusBarItem) {
            this.statusBarItem.dispose();
        }
    }
}

module.exports = StatusBarManager;