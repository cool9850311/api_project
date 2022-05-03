var express = require('express');
var knex = require('./knexSetting')
var router = express.Router();


router.get('/', function(req, res, next) {
    var queryString = knex.select().from('product');
    if(req.query.id!=null){
        queryString = queryString.where('id',req.query.id);
        
    }
    if(req.query.product_name!=null){
        queryString = queryString.where('product_name',req.query.product_name);
    }
    if(req.query.price!=null){
        queryString = queryString.where('price',req.query.price);
    }
    if(req.query.remark!=null){
        queryString = queryString.where('remark',req.query.remark);
    }
    queryString.then(result => {
        res.json(result);
    });
    
});
router.post('/',function(req, res, next) {
    var queryString = knex.select().from('product');
    if(req.body.method=='create'){
        var product_name = req.body.product_name;
        var price = req.body.price;
        var sold_num = req.body.sold_num;
        var stock_num = req.body.stock_num;
        var timestamp = Date.now();
        var remark = req.body.remark;
        knex.insert({
            product_name : product_name,
            price : price,
            sold_num : sold_num,
            stock_num : stock_num,
            timestamp : timestamp,
            remark : remark
        }).then(result => {
            res.json(result);
        });
        return;
    }
    if(req.body.method=='update'){
        return;
    }
    if(req.body.method=='delete'){
        return;
    }
});


module.exports = router;
