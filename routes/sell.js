/* eslint-disable max-len */
const express = require('express');
const knex = require('knex')(require('./knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', function(req, res) {
  const userID = req.body.user_id;
  const order = JSON.parse(req.body.order);
  const orderID = 'order'+Date.now();
  // console.log(Date.now());
  if (userID==null||isNaN(userID)||userID<0) {
    res.json({success: false, message: 'user_id invalid'});
    return;
  }
  knex.transaction(function(trx) {
    knex
        .transacting(trx)
        .insert({
          user_id: userID,
          order_id: orderID,
        })
        .into('order_table')
        .then((result) => {
          console.log(result);
        });
    const subOrderTableObject = [];
    // eslint-disable-next-line guard-for-in
    for (p in order.buy_product) {
      const tempObject = {};
      tempObject.order_id = orderID;
      tempObject.product_id = order.buy_product[p].product_id;
      tempObject.amount = order.buy_product[p].amount;
      tempObject.remark = order.buy_product[p].remark;
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
    knex
        .transacting(trx)
        .insert(subOrderTableObject)
        .into('sub_order_table')
        .then( (result)=>{
          res.json({success: true, message: 'ok'});
        }).then(trx.commit).catch(trx.rollback);
  });
});

module.exports = router;
