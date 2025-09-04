const db = require('../db/database.js')

const ordersModel = {
  checkout(userId, cartItems) {
    return new Promise((resolve, reject) => {
      db.run('BEGIN TRANSACTION', [])
      cartItems.forEach((item) => {
        db.run('INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)', [
          userId,
          item.productId,
          item.quantity,
        ])
      })
      db.run('COMMIT', [], (err) => {
        if (err) {
          db.run('ROLLBACK', [])
          reject(err)
        } else {
          resolve({message: 'Checkout successful'})
        }
      })
    })  
  },

  orders(userId) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM orders WHERE user_id = ?', [userId], (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  }
}

module.exports = ordersModel
