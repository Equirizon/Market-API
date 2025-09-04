const db = require('../db/database.js')

const productModel = {
  async listProducts() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  },

  async getProduct(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    })
  },

  async addProduct(name, description, price) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
        [name, description, price],
        function (err) {
          if (err) reject(err)
          else resolve({message: 'Product added', id: this.lastID})
        }
      )
    })
  },
}

module.exports = productModel
