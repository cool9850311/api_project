const knex = require('knex')({
    client: 'mysql2',
    version: '8.0',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'newuser',
      password : 'password',
      database : 'api_project_table'
    }
  });
  module.exports = knex;