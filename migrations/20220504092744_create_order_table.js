/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex, Promise) {
  return knex.schema.alterTable('sub_order_table', (table) => {
    table.string('status');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
  return knex.schema.alterTable('sub_order_table', (table) => {
    table.dropColumn('status');
  });
};
