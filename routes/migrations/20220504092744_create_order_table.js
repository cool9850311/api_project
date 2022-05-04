/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_table', (table) => {
    table.increments();
    table.string('order_id');
    table.string('user_id');
    table.timestamp('create_at').defaultTo(knex.fn.now());
    table.timestamp('edit_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_table');
};
