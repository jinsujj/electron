import {app, BrowserWindow, ipcMain} from 'electron'
import path from 'path';
import { sqlite3 } from 'sqlite3';

import db from './db/init';

ipcMain.handle('get-todos', () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM todos', [] ,(err:any, rows: any[]) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
});

ipcMain.handle('add-todo', (_event, title: string) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO todos(title) VALUES (?)', [title], function (this: sqlite3["RunResult"], err: any) {
      if (err) reject(err);
      else resolve({ id: this.lastID, title, completed: 0 });
    });
  });
});

ipcMain.handle('toggle-todo', (_event, id: number) => {
  db.get('SELECT completed FROM todos WHERE id = ?', [id], (err: any, row: any) => {
    if (!err && row) {
      const newStatus = row.completed ? 0 : 1;
      db.run('UPDATE todos SET completed = ? WHERE id = ?', [newStatus, id]);
    }
  });
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.js'),
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