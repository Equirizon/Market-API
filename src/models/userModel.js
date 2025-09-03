const getUser = `SELECT * FROM users WHERE id = ?`
const getUsers = `SELECT * FROM users`
const createUser = `INSERT INTO users (name, email) VALUES (?, ?)`

module.exports = { getUser, getUsers, createUser }
