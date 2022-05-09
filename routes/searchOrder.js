/* eslint-disable max-len */
const express = require('express');
const knex = require('knex')(require('../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', async function(req, res) {
  const orderID = req.body.order_id;
  const queryString = knex.select('sub_order_table.id', 'order_id', 'product_id', 'price', 'amount', 'sub_order_table.remark')
      .from('sub_order_table')
      .where(function() {
        this.where('status', '<>', 'deleted').orWhereNull('status');
      })
      .where('order_id', orderID)
      .leftJoin('product', function() {
        this.on('product.id', '=', 'sub_order_table.product_id');
      });
  const result = await queryString;
  res.json(result);
});

module.exports = router;
