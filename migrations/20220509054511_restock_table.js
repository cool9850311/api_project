/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('restock_table', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('product_id').notNullable();
    table.integer('amount').notNullable();
    table.timestamp('create_at').defaultTo(knex.fn.now());
    table.string('remark');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('restock_table');
};
