const db = require("../db/database.js")

function listProducts(req, res) {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message })
    res.json(rows)
  })
}

function getProduct(req, res) {
  const { id } = req.params
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!row) return res.status(404).json({ error: "Product not found" })
    res.json(row)
  })
}

function addProduct(req, res) {
  const { name, description, price } = req.body
  db.run("INSERT INTO products (name, description, price) VALUES (?, ?, ?)", [name, description, price], function (err) {
    if (err) return res.status(400).json({ error: err.message })
      res.status(201).json({ message: "Product added", id: this.lastID })
  })
}

module.exports = { listProducts, getProduct, addProduct }