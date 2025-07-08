import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';

// 안전한 사용자 데이터 경로 사용
const userDataPath = app.getPath('userData');
if (!fs.existsSync(userDataPath)) {
  fs.mkdirSync(userDataPath, { recursive: true });
}
const dbPath = path.join(userDataPath, 'todo.db');

const sqlite3Verbose = sqlite3.verbose();
const db: sqlite3.Database = new sqlite3Verbose.Database(dbPath, (err) => {
  if (err) {
    console.error('DB 연결 에러:', err);
  } else {
    console.log('DB 연결 성공:', dbPath);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    )
  `, (err) => {
    if (err) {
      console.error('테이블 생성 에러:', err);
    }
  });
});

export default db;