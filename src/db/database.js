const sqlite3 = require("sqlite3").verbose()

// Connect DB
const db = new sqlite3.Database("./dev.sqlite3", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error("Error opening database:", err)
  } else {
    console.info("Connected to SQLite database.")
  }
})

// Enable foreign key constraints
db.run("PRAGMA foreign_keys = ON")

module.exports = db
