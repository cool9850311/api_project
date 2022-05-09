const express = require('express');
const knex = require('knex')(require('../knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', function(req, res) {
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
  knex.transaction(function(trx) {
    knex
        .transacting(trx)
        .insert({
          user_id: userID,
          product_id: productID,
          amount: amount,
          remark: remark,
        })
        .into('restock_table')
        .then((result) => {
          console.log(result);
        });
    knex
        .transacting(trx)
        .forUpdate()
        .select('stock_num')
        .from('product')
        .where('id', productID)
        .then( (result)=>{
          stockNum = result[0].stock_num;
          // console.log(stockNum);
          knex('product')
              .transacting(trx)
              .where('id', productID)
              .update('stock_num', (Number(stockNum)+Number(amount)))
              .then( (result)=>{
                res.json({success: true, message: 'ok'});
              });
        }).then(trx.commit).catch(trx.rollback);
    // console.log(stockNum);
  });
});

module.exports = router;
