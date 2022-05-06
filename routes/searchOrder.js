/* eslint-disable max-len */
const express = require('express');
const knex = require('knex')(require('./knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', function(req, res) {
  const orderID = req.body.order_id;
  knex.select('sub_order_table.id', 'order_id', 'product_id', 'price', 'amount', 'sub_order_table.remark')
      .from('sub_order_table')
      .where('order_id', orderID)
      .leftJoin('product', function() {
        this.on('product.id', '=', 'sub_order_table.product_id');
      })
      .then((result) => {
        res.json(result);
      });
});

module.exports = router;
