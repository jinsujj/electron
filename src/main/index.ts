import {app, BrowserWindow} from 'electron'
import path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.ts'),
            contextIsolation: true
        }
    });

   const isDev = !app.isPackaged;
    if (isDev) {
    win.loadURL('http://localhost:5173');
    } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
}
}

app.whenReady().then(createWindow);