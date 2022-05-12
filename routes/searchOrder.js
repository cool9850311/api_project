/* eslint-disable max-len */
const express = require('express');
const knex = require('knex')(require('../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();
const redis = require('redis');
const auth = require('./auth/auth');
const redisClient = redis.createClient({
  socket: {
    host: 'redis',
    port: 6379,
  },
});

redisClient.on('error', (err) => {
  console.log(err);
  console.log('Error occured while connecting or accessing redis server');
});


router.post('/', auth, async function(req, res) {
  const orderID = req.body.order_id;
  if (orderID == null) {
    res.json({success: false, message: 'missing order_id'});
    return;
  }
  await redisClient.connect();
  const redisResult = await redisClient.get('Order:' + orderID);
  if (redisResult!=null) {
    // console.log(redisClient);
    res.json(JSON.parse(redisResult));
    redisClient.quit();
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
  await redisClient.set('Order:' + orderID, JSON.stringify(result));
  redisClient.quit();
  res.json(result);
});

module.exports = router;
