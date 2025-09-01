const sqlite3 = require("sqlite3").verbose()

// Connect DB
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error("Error opening database:", err)
  } else {
    console.info("Connected to SQLite database.")
  }
})

// Create Users Table
db.run(
  `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,
  (err) => {
    if (err) {
      console.error({ type: "error", message: "Error creating users table: " + err.message })
      return
    }
    console.info("Users table created or already exists.")
  }
)

// Enable foreign key constraints
db.run("PRAGMA foreign_keys = ON")

module.exports = db
