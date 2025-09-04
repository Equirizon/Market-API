import db from '../db/database.js'

const cart = {
  viewCart(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM cart WHERE id = ?', [id], (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    })
  },

  deleteCartItem(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM cart WHERE id = ?', [id], function (err) {
        if (err) reject(err)
        else resolve({message: 'Item removed from cart', changes: this.changes})
      })
    })
  },

  addToCart(userId, productId, quantity) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity],
        function (err) {
          if (err) reject(err)
          else resolve({message: 'Item added to cart', id: this.lastID})
        }
      )
    })
  },
}

module.exports = cart
// cartModel.js
