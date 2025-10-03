/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    { name: 'XL Eggs', description: 'Bounty Fresh XL eggs 1 tray', price: 280, stock: 20 },
    { name: 'Coco Pandan', description: 'Best selling rice', price: 1190, stock: 10 },
    { name: 'Sweet Hasmin', description: 'Soft rice', price: 1030, stock: 8 },
  ])
}
