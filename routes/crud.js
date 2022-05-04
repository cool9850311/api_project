const express = require('express');
const knex = require('knex')(require('./knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', function(req, res, next) {
  let queryString = knex.select().from('product');
  if (req.query.id != null) {
    queryString = queryString.where('id', req.query.id);
  }
  if (req.query.product_name != null) {
    queryString = queryString.where('product_name', req.query.product_name);
  }
  if (req.query.price != null) {
    queryString = queryString.where('price', req.query.price);
  }
  if (req.query.remark != null) {
    queryString = queryString.where('remark', req.query.remark);
  }
  queryString.then((result) => {
    res.json(result);
  });
});
router.post('/', function(req, res) {
  console.log(req.body);
  if (req.body.method == 'create') {
    const productName = req.body.product_name;
    const price = req.body.price;
    const soldNum = req.body.sold_num;
    const stockNum = req.body.stock_num;
    const timeStamp = new Date();
    const remark = req.body.remark;
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
  }
  if (req.body.method == 'update') {
    const queryString = knex('product');
    const productName = req.body.product_name;
    const price = req.body.price;
    const soldNum = req.body.sold_num;
    const stockNum = req.body.stock_num;
    const remark = req.body.remark;
    // update
    const productNameUpdate = req.body.product_name_update;
    const priceUpdate = req.body.price_update;
    const soldNumUpdate = req.body.sold_num_update;
    const stockNumUpdate = req.body.stock_num_update;
    const remarkUpdate = req.body.remark_update;
    if (productName != null) {
      queryString = queryString.where('product_name', productName);
    }
    if (price != null) {
      queryString = queryString.where('price', price);
    }
    if (soldNum != null) {
      queryString = queryString.where('sold_num', soldNum);
    }
    if (stockNum != null) {
      queryString = queryString.where('stock_num', stockNum);
    }
    if (remark != null) {
      queryString = queryString.where('remark', remark);
    }
    queryString = queryString.update('product_name', productNameUpdate);
    queryString = queryString.update('price', priceUpdate);
    queryString = queryString.update('sold_num', soldNumUpdate);
    queryString = queryString.update('stock_num', stockNumUpdate);
    queryString = queryString.update('remark', remarkUpdate);
    // console.log(queryString);
    queryString.then((result) => {
      res.json({success: true, message: 'ok'});
    });
    return;
  }
  if (req.body.method == 'delete') {
    const queryString = knex('product');
    const productName = req.body.product_name;
    const price = req.body.price;
    const soldNum = req.body.sold_num;
    const stockNum = req.body.stock_num;
    const remark = req.body.remark;
    if (productName != null) {
      queryString = queryString.where('product_name', productName);
    }
    if (price != null) {
      queryString = queryString.where('price', price);
    }
    if (soldNum != null) {
      queryString = queryString.where('sold_num', soldNum);
    }
    if (stockNum != null) {
      queryString = queryString.where('stock_num', stockNum);
    }
    if (remark != null) {
      queryString = queryString.where('remark', remark);
    }
    queryString.del().then((result) => {
      res.json({success: true, message: 'ok'});
    });
    return;
  }
});

module.exports = router;
