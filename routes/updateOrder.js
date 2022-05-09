/* eslint-disable max-len */
const express = require('express');
const knex = require('knex')(require('../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', function(req, res) {
  const orderID = req.body.order_id;
  const updateOrder = req.body.buy_product;
  if (orderID==null) {
    res.json({success: false, message: 'missing order_id'});
    return;
  }
  if (updateOrder==null||updateOrder.length==0) {
    res.json({success: false, message: 'missing buy product'});
    return;
  }
  const subOrderTableObject = [];
  // eslint-disable-next-line guard-for-in
  for (p in updateOrder) {
    const tempObject = {};
    tempObject.order_id = orderID;
    tempObject.product_id = updateOrder[p].product_id;
    tempObject.amount = updateOrder[p].amount;
    tempObject.remark = updateOrder[p].remark;
    if (tempObject.product_id==null||isNaN(tempObject.product_id)||tempObject.product_id<0) {
      res.json({success: false, message: 'json data buy_product.product_id invalid'});
      return;
    }
    if (tempObject.amount==null||isNaN(tempObject.amount)||tempObject.amount<0) {
      res.json({success: false, message: 'json data buy_product.amount invalid'});
      return;
    }
    subOrderTableObject.push(tempObject);
  }
  // end build json
  try {
    knex.transaction(async function(trx) {
      let queryString = knex('sub_order_table')
          .transacting(trx)
          .where('order_id', orderID)
          .update('status', 'deleted');
      await queryString;

      queryString = knex
          .transacting(trx)
          .insert(subOrderTableObject)
          .into('sub_order_table');
      await queryString;
      queryString =
          knex('order_table')
              .transacting(trx)
              .where('order_id', orderID)
              .update('edit_at', new Date());
      await queryString;
      res.json({success: true, message: 'ok'});
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
