/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex
      .insert({
        user_name: 'teat123',
        email: 'test123@gmail.com',
        password: 'passwd',
      })
      .into('user_table');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
