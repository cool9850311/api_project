/* eslint-disable max-len */
const express = require('express');
const knex = require('knex')(require('../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
router.post('/', function(req, res) {
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
  const userID = req.body.user_id;
  const order = req.body.buy_product;
  const orderID = 'order'+Date.now();
  // console.log(Date.now());
  if (userID == null || isNaN(userID) || userID < 0) {
    res.json({success: false, message: 'user_id invalid'});
    return;
  }
  if (order == null || order.length == 0) {
    res.json({success: false, message: 'missing buy product'});
    return;
  }
  const subOrderTableObject = [];
  // eslint-disable-next-line guard-for-in
  for (p in order) {
    const tempObject = {};
    tempObject.order_id = orderID;
    tempObject.product_id = order[p].product_id;
    tempObject.amount = order[p].amount;
    tempObject.remark = order[p].remark;
    if (tempObject.product_id == null || isNaN(tempObject.product_id) || tempObject.product_id < 0) {
      res.json({success: false, message: 'json data buy_product.product_id invalid'});
      return;
    }
    if (tempObject.amount == null || isNaN(tempObject.amount) || tempObject.amount < 0) {
      res.json({success: false, message: 'json data buy_product.amount invalid'});
      return;
    }
    subOrderTableObject.push(tempObject);
  }
  // end build json
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
