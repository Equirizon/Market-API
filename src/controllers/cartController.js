const db = require("../db/database.js")

function viewCart(req, res) {
  const { id } = req.params
  db.get("SELECT * FROM cart WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!row) return res.status(404).json({ error: "Cart not found" })
    res.json(row)
  })
}

function addToCart(req, res) {
  const { userId, productId, quantity } = req.body
  db.run("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)", [userId, productId, quantity], function (err) {
    if (err) return res.status(400).json({ error: err.message })
    res.status(201).json({ message: "Item added to cart", id: this.lastID })
  })
}

function deleteCartItem(req, res) {
  const { id } = req.params
  db.run("DELETE FROM cart WHERE id = ?", [id], function (err) {
    if (err) return res.status(400).json({ error: err.message })
    if (this.changes === 0) return res.status(404).json({ error: "Cart item not found" })
    res.json({ message: "Cart item deleted successfully" })
  })
}

module.exports = { addToCart, viewCart, deleteCartItem }