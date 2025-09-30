/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'Equirizon',
      email: 'equirizon@gmail.com',
      password: '$2b$10$KtpxkXktJ.r585ir.IQTg.IXH4rlO37MyfC0sADSYF8LTbp9snLF.',
    },
  ])
}
