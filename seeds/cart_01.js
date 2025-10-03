/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cart').del()
  await knex('cart').insert([
    { user_id: 1, product_id: 2, product_price: 280.0, subtotal: 2800.0, quantity: 10 },
    { user_id: 1, product_id: 3, product_price: 1190.0, subtotal: 11900.0, quantity: 10 },
    { user_id: 1, product_id: 4, product_price: 1030.0, subtotal: 10300.0, quantity: 10 },
  ])
}
