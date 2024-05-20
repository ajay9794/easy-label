const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    const isDev = await import('electron-is-dev');

    const startUrl = isDev.default ? 'http://localhost:3000' : url.format({
        pathname: path.join(__dirname, 'client/build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
