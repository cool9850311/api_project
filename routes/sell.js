const express = require('express');
const knex = require('knex')(require('./knexfile'));
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', function(req, res) {
  const userID = req.body.user_id;
  const order = JSON.parse(req.body.order);
  const orderID = 'order'+Date.now();
  // console.log(Date.now());

  knex.transaction(function(trx) {
    knex
        .transacting(trx)
        .insert({
          user_id: userID,
          order_id: orderID,
        })
        .into('order_table')
        .then((result) => {
          console.log(result);
        });
    // build json
    const subOrderTableObject = [];
    // eslint-disable-next-line guard-for-in
    for (p in order.buy_product) {
      const tempObject = {};
      tempObject.order_id = orderID;
      tempObject.product_id = order.buy_product[p].product_id;
      tempObject.amount = order.buy_product[p].amount;
      tempObject.remark = order.buy_product[p].remark;
      subOrderTableObject.push(tempObject);
    }
    // end build json
    knex
        .transacting(trx)
        .insert(subOrderTableObject)
        .into('sub_order_table')
        .then( (result)=>{
          res.json({success: true, message: 'ok'});
        }).then(trx.commit).catch(trx.rollback);
  });
});

module.exports = router;
