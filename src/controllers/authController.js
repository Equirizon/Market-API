const db = require("../db/database.js")

function register(req, res) {
  const { name, email, password } = req.body
  // Implement registration logic
}

function login(req, res) {
  const { email, password } = req.body
  // Implement login logic
}

module.exports = { login, register }
