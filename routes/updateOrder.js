/* eslint-disable max-len */
const express = require('express');
const knex = require('knex')(require('./knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', function(req, res) {
  const orderID = req.body.order_id;
  const updateOrder = JSON.parse(req.body.order);
  knex.transaction(function(trx) {
    
  });
});

module.exports = router;
