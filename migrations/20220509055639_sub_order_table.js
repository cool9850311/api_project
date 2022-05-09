/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sub_order_table', (table) => {
    table.increments();
    table.string('order_id');
    table.integer('product_id');
    table.integer('amount');
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
