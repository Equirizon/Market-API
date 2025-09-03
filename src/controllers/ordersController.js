const db = require("../db/database.js")

function checkout(req, res) {
  const { userId, cartItems } = req.body
  db.run("BEGIN TRANSACTION", [])
  cartItems.forEach(item => {
    db.run("INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)", [userId, item.productId, item.quantity])
  })
  db.run("COMMIT", [], (err) => {
    if (err) {
      db.run("ROLLBACK", [])
      return res.status(400).json({ error: err.message })
    }
    res.status(201).json({ message: "Checkout successful" })
  })
}


function orders(req, res) {
  const { userId } = req.params
  db.all("SELECT * FROM orders WHERE user_id = ?", [userId], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message })
    res.json(rows)
  })
}

module.exports = { checkout, orders }