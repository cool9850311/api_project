/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sub_order_table', (table) => {
    table.increments();
    table.string('order_id').notNullable();
    table.integer('product_id').notNullable();
    table.integer('amount').notNullable();
    table.string('remark');
    table.string('status');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('sub_order_table');
};
