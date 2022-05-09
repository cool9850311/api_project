const express = require('express');
const knex = require('knex')(require('../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', function(req, res, next) {
  let queryString = knex.select().from('product');
  if (req.query.id != null) {
    if (isNaN(req.query.id)||req.query.id<0) {
      res.json({success: false, message: 'id invalid'});
      return;
    }
    queryString = queryString.where('id', req.query.id);
  }
  if (req.query.product_name != null) {
    queryString = queryString.where('product_name', req.query.product_name);
  }
  if (req.query.price != null) {
    if (isNaN(req.query.price)||req.query.price<0) {
      res.json({success: false, message: 'price invalid'});
      return;
    }
    queryString = queryString.where('price', req.query.price);
  }
  if (req.query.remark != null) {
    queryString = queryString.where('remark', req.query.remark);
  }
  queryString.then((result) => {
    res.json(result);
  });
});

module.exports = router;
