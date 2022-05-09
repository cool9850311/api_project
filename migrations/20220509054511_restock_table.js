/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('restock_table', (table) => {
    table.increments();
    table.integer('user_id');
    table.integer('product_id');
    table.integer('amount');
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
