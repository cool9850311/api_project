/* eslint-disable max-len */
const express = require('express');
const knex = require('knex')(require('../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
router.post('/', async function(req, res) {
  const token = req.cookies.token;

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end();
  }
  // let payload;
  try {
    // payload = jwt.verify(token, jwtKey);
    jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }
  const orderID = req.body.order_id;
  if (orderID == null) {
    res.json({success: false, message: 'missing order_id'});
    return;
  }
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
