const db = require('../db/database.js')

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
      console.error({type: 'error', message: 'Error creating users table: ' + err.message})
      return
    }
    console.info('Users table created or already exists.')
  }
)

const userModel = {
  getUsers() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  },

  getUserById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
          return reject(err)
        }
        resolve(row)
      })
    })
  },

  createUser(name, email) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
      stmt.run([name, email], function (err) {
        if (err) {
          return reject(err)
        }
        resolve({id: this.lastID, name, email})
      })
      stmt.finalize()
    })
  },
}

module.exports = userModel
