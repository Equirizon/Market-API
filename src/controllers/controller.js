const db = require("../db/database.js")

function createUser(req, res) {
  const { name, email } = req.body
  db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function (err) {
    if (err) return res.status(400).json({ error: err.message })
    res.json({ message: "User created successfully", id: this.lastID, name, email })
  })
}

function getUser(req, res) {
  const { id } = req.params
  db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!row) return res.status(404).json({ error: "User not found" })
    res.json({ user: row })
  })
}

function getUsers(req, res) {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message })
    res.json({ users: rows })
  })
}

module.exports = { createUser, getUser, getUsers }

