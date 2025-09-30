/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.enu('role', ['user', 'admin']).defaultTo('user').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
  await knex.schema.createTable('refresh_tokens', (table) => {
    table.increments('id').primary()
    table.string('refresh_token').unique().notNullable()

    table.string('email').notNullable()
    table.foreign('email').references('users.email').onDelete('CASCADE').onUpdate('CASCADE')

    table.boolean('revoked').defaultTo(false)
    table.string('device').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('expires_on').notNullable()
  })
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.text('description')
    table.decimal('price', 10, 2).notNullable().unsigned()
    table.integer('stock').defaultTo(0).unsigned()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
  await knex.schema.createTable('cart', (table) => {
    table.increments('id').primary()

    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')

    table.integer('product_id').unsigned().notNullable()
    table.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE')

    table.decimal('product_price', 10, 2).notNullable()
    table.decimal('subtotal', 10, 2).notNullable().defaultTo(0.0)
    table.integer('quantity').notNullable()
    table.timestamp('added_at').defaultTo(knex.fn.now())
  })
  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary()

    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')

    table.decimal('total_amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
  await knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary()

    table.integer('order_id').unsigned().notNullable()
    table.foreign('order_id').references('orders.id').onDelete('CASCADE')

    table.integer('product_id').unsigned().notNullable()
    table.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE')

    table.integer('quantity').notNullable()
    table.decimal('price', 10, 2).notNullable()
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('order_items')
  await knex.schema.dropTableIfExists('orders')
  await knex.schema.dropTableIfExists('cart')
  await knex.schema.dropTableIfExists('products')
  await knex.schema.dropTableIfExists('refresh_tokens')
  await knex.schema.dropTableIfExists('users')
}
