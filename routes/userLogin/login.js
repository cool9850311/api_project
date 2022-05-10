const express = require('express');
const knex = require('knex')(require('../../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 300;

router.post('/', async function(req, res) {
  const {userName, password} = req.body;
  if (!userName || !password) {
    return res.status(401).end();
  }
  const queryString = knex
      .select('user_name')
      .from('user_table')
      .where('user_name', userName)
      .where('password', password);
  const result = await queryString;
  if (!result[0]) {
    return res.status(401).end();
  }
  const token = jwt.sign({userName}, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  });
  console.log('token:', token);

  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.cookie('token', token, {maxAge: jwtExpirySeconds * 1000});
  res.end();
});

module.exports = router;
