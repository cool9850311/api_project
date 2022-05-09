const express = require('express');
const knex = require('knex')(require('../../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();


router.post('/', function(req, res) {
  let queryString = knex('product');
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
  if (priceUpdate!=null&&isNaN(priceUpdate)||priceUpdate<0) {
    res.json({success: false, message: 'price_update invalid'});
    return;
  }
  if (soldNumUpdate!=null&&isNaN(soldNumUpdate)||soldNumUpdate<0) {
    res.json({success: false, message: 'sold_num_update invalid'});
    return;
  }
  if (stockNumUpdate!=null&&isNaN(stockNumUpdate)||stockNumUpdate<0) {
    res.json({success: false, message: 'stock_num_update invalid'});
    return;
  }
  // eslint-disable-next-line max-len
  if (priceUpdate==null&&productNameUpdate==null&&soldNumUpdate==null&&stockNumUpdate==null&&remarkUpdate==null) {
    res.json({success: false, message: 'missing any update value'});
    return;
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
});

module.exports = router;
