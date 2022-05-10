const express = require('express');
const knex = require('knex')(require('../../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
router.get('/', function(req, res, next) {
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
  // console.log(payload.userName);
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
