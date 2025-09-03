const db = require("../db/database.js")
const userModel = require("../models/userModel.js")

function createUser(req, res) {
  const { name, email } = req.body
  db.run(userModel.createUser, [name, email], function (err) {
    if (err) return res.status(400).json({ error: err.message })
    res.json({ message: "User created successfully", id: this.lastID, name, email })
  })
}

function getUser(req, res) {
  const { id } = req.params
  db.get(userModel.getUser, [id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!row) return res.status(404).json({ error: "User not found" })
    res.json(row)
  })
}

function getUsers(req, res) {
  db.all(userModel.getUsers, [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message })
    res.json(rows)
  })
}

module.exports = { createUser, getUser, getUsers }

