const express = require('express');
const knex = require('knex')(require('../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', function(req, res) {
  const productName = req.body.product_name;
  const price = req.body.price;
  let soldNum = req.body.sold_num;
  let stockNum = req.body.stock_num;
  const timeStamp = new Date();
  const remark = req.body.remark;
  if (productName==null) {
    res.json({success: false, message: 'product_name invalid'});
    return;
  }
  if (price==null||isNaN(price)||price<0) {
    res.json({success: false, message: 'price invalid'});
    return;
  }
  if (soldNum==null) {
    soldNum = 0;
  }
  if (stockNum==null) {
    stockNum = 0;
  }
  if (isNaN(soldNum)||soldNum<0) {
    res.json({success: false, message: 'sold_num invalid'});
    return;
  }
  if (isNaN(stockNum)||stockNum<0) {
    res.json({success: false, message: 'stock_num invalid'});
    return;
  }
  knex
      .insert({
        product_name: productName,
        price: price,
        sold_num: soldNum,
        stock_num: stockNum,
        last_edit_time: timeStamp,
        remark: remark,
      })
      .into('product')
      .then((result) => {
        res.json({success: true, message: 'ok'});
      });
  return;
});

module.exports = router;
