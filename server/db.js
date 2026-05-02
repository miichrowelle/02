const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, 'fermentation.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Initialize database schema
const initDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS fermentations (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      temperature REAL NOT NULL,
      start_time TEXT NOT NULL,
      plan TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT
    )
  `);
};

initDb();

// Insert new fermentation session
const insertFermentation = (id, type, temperature, startTime, plan) => {
  const stmt = db.prepare(`
    INSERT INTO fermentations (id, type, temperature, start_time, plan, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(id, type, temperature, startTime, JSON.stringify(plan), new Date().toISOString());
};

// Get fermentation by ID
const getFermentation = (id) => {
  const stmt = db.prepare('SELECT * FROM fermentations WHERE id = ?');
  const row = stmt.get(id);
  if (row) {
    return {
      id: row.id,
      type: row.type,
      temperature: row.temperature,
      startTime: row.start_time,
      plan: JSON.parse(row.plan),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
  return null;
};

// Update fermentation plan (if changes are made)
const updateFermentation = (id, plan) => {
  const stmt = db.prepare(`
    UPDATE fermentations SET plan = ?, updated_at = ? WHERE id = ?
  `);
  return stmt.run(JSON.stringify(plan), new Date().toISOString(), id);
};

module.exports = { db, insertFermentation, getFermentation, updateFermentation };
