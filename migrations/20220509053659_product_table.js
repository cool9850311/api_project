/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('product', (table)=>{
    table.increments();
    table.string('product_name').unique();
    table.double('price');
    table.integer('sold_num');
    table.integer('stock_num');
    table.timestamp('last_edit_time');
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
