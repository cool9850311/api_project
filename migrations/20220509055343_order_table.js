/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order_table', (table) => {
    table.increments();
    table.string('order_id').unique().notNullable();
    table.string('user_id').notNullable();
    table.timestamp('create_at').defaultTo(knex.fn.now());
    table.timestamp('edit_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('order_table');
};
