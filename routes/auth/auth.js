const express = require('express');
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';

module.exports = function authToken(req, res, next) {
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
  // console.log('next');
  next();
};
