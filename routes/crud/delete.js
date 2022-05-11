const express = require('express');
const knex = require('knex')(require('../../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();
const auth = require('../auth/auth');
router.post('/', auth, function(req, res) {
  let queryString = knex('product');
  const productName = req.body.product_name;
  const price = req.body.price;
  const soldNum = req.body.sold_num;
  const stockNum = req.body.stock_num;
  const remark = req.body.remark;
  if (productName != null) {
    queryString = queryString.where('product_name', productName);
  }
  if (price != null) {
    if (isNaN(price)||price<0) {
      res.json({success: false, message: 'price invalid'});
      return;
    }
    queryString = queryString.where('price', price);
  }
  if (soldNum != null) {
    if (isNaN(soldNum)||soldNum<0) {
      res.json({success: false, message: 'sold_num invalid'});
      return;
    }
    queryString = queryString.where('sold_num', soldNum);
  }
  if (stockNum != null) {
    if (isNaN(stockNum)||stockNum<0) {
      res.json({success: false, message: 'stock_num invalid'});
      return;
    }
    queryString = queryString.where('stock_num', stockNum);
  }
  if (remark != null) {
    queryString = queryString.where('remark', remark);
  }
  queryString.del().then((result) => {
    res.json({success: true, message: 'ok'});
  });
  return;
});

module.exports = router;
