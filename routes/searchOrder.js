/* eslint-disable max-len */
const express = require('express');
const knex = require('knex')(require('./knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', function(req, res) {
  const orderID = req.body.order_id;
  knex.select()
      .from('sub_order_table')
      .where('order_id', orderID)
      .then((result) => {
        res.json(result);
      });
});

module.exports = router;
