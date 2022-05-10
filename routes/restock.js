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
  const productID = req.body.product_id;
  const amount = req.body.amount;
  const remark = req.body.remark;
  if (userID == null || isNaN(userID)) {
    res.json({success: false, message: 'user_id invalid'});
    return;
  }
  if (productID == null || isNaN(productID)) {
    res.json({success: false, message: 'product_id invalid'});
    return;
  }
  if (amount == null || isNaN(amount) || amount < 0) {
    res.json({success: false, message: 'amount invalid'});
    return;
  }
  let stockNum = 0;
  knex.transaction(async function(trx) {
    let queryString = knex
        .transacting(trx)
        .insert({
          user_id: userID,
          product_id: productID,
          amount: amount,
          remark: remark,
        })
        .into('restock_table');
    await queryString;
    queryString = knex
        .transacting(trx)
        .forUpdate()
        .select('stock_num')
        .from('product')
        .where('id', productID);
    await queryString;

    try {
      stockNum = queryString[0].stock_num;
    } catch (error) {
      console.log(error);
    }
    queryString = knex('product')
        .transacting(trx)
        .where('id', productID)
        .update('stock_num', (Number(stockNum)+Number(amount)))
        .then( (result)=>{
          res.json({success: true, message: 'ok'});
        });
    await queryString;
  });
});

module.exports = router;
