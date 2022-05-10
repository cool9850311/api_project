const express = require('express');
const knex = require('knex')(require('../../knexfile'));
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
  try {
    jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }
  const productName = req.body.product_name;
  const price = req.body.price;
  let soldNum = req.body.sold_num;
  let stockNum = req.body.stock_num;
  // const timeStamp = new Date();
  const remark = req.body.remark;
  if (productName == null) {
    res.json({success: false, message: 'product_name invalid'});
    return;
  }
  if (price == null || isNaN(price) || price < 0) {
    res.json({success: false, message: 'price invalid'});
    return;
  }
  if (soldNum == null) {
    soldNum = 0;
  }
  if (stockNum == null) {
    stockNum = 0;
  }
  if (isNaN(soldNum) || soldNum < 0) {
    res.json({success: false, message: 'sold_num invalid'});
    return;
  }
  if (isNaN(stockNum) || stockNum < 0) {
    res.json({success: false, message: 'stock_num invalid'});
    return;
  }
  knex
      .insert({
        product_name: productName,
        price: price,
        sold_num: soldNum,
        stock_num: stockNum,
        remark: remark,
      })
      .into('product')
      .then((result) => {
        res.json({success: true, message: 'ok'});
      });
  return;
});

module.exports = router;
