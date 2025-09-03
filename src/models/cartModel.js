const viewCart = "SELECT * FROM cart WHERE id = ?"
const addToCart = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)"
const deleteCartItem = "DELETE FROM cart WHERE id = ?"

module.exports = { viewCart, addToCart, deleteCartItem }