/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('product', (table) => {
    table.increments();
    table.string('product_name').unique().notNullable();
    table.double('price').notNullable();
    table.integer('sold_num').notNullable();
    table.integer('stock_num').notNullable();
    table.timestamp('last_edit_time')
        .notNullable()
        .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.string('remark');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('product');
};
