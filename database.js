import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Server is running here: ", __filename)

// Use a file-based SQLite database in the ./db directory
const dbDir = path.resolve(__dirname, 'db');
const dbPath = path.join(dbDir, 'database.sqlite');

// Ensure the ./db directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create tables if they don't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS papers
        id INT PRIMARY KEY AUTOINCREMENT`)
});