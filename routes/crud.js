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
router.post('/',function(req, res) {
    console.log(req.body);
    if(req.body.method=='create'){
        var product_name = req.body.product_name;
        var price = req.body.price;
        var sold_num = req.body.sold_num;
        var stock_num = req.body.stock_num;
        var timestamp = new Date();
        var remark = req.body.remark;
        knex.insert({
            product_name : product_name,
            price : price,
            sold_num : sold_num,
            stock_num : stock_num,
            last_edit_time : timestamp,
            remark : remark
        })
        .into('product')
        .then(result => {
            res.json({ success: true, message: 'ok' });
        });
        return;
    }
    if(req.body.method=='update'){
        var queryString = knex('product');
        var product_name = req.body.product_name;
        var price = req.body.price;
        var sold_num = req.body.sold_num;
        var stock_num = req.body.stock_num;
        var timestamp = new Date();
        var remark = req.body.remark;
        //update
        var product_name_update = req.body.product_name_update;
        var price_update = req.body.price_update;
        var sold_num_update = req.body.sold_num_update;
        var stock_num_update = req.body.stock_num_update;
        var remark_update = req.body.remark_update;
        if(product_name!=null){
            queryString = queryString.where('product_name',product_name);
        }
        if(price!=null){
            queryString = queryString.where('price',price);
        }
        if(sold_num!=null){
            queryString = queryString.where('sold_num',sold_num);
        }
        if(stock_num!=null){
            queryString = queryString.where('stock_num',stock_num);
        }
        if(remark!=null){
            queryString = queryString.where('remark',remark);
        }
        queryString = queryString.update('product_name',product_name_update);
        queryString = queryString.update('price',price_update);
        queryString = queryString.update('sold_num',sold_num_update);
        queryString = queryString.update('stock_num',stock_num_update);
        queryString = queryString.update('remark',remark_update);
        //console.log(queryString);
        queryString.then(result => {
            res.json({ success: true, message: 'ok' });
        });
        return;
    }
    if(req.body.method=='delete'){
        var queryString = knex('product');
        var product_name = req.body.product_name;
        var price = req.body.price;
        var sold_num = req.body.sold_num;
        var stock_num = req.body.stock_num;
        var timestamp = new Date();
        var remark = req.body.remark;
        if(product_name!=null){
            queryString = queryString.where('product_name',product_name);
        }
        if(price!=null){
            queryString = queryString.where('price',price);
        }
        if(sold_num!=null){
            queryString = queryString.where('sold_num',sold_num);
        }
        if(stock_num!=null){
            queryString = queryString.where('stock_num',stock_num);
        }
        if(remark!=null){
            queryString = queryString.where('remark',remark);
        }
        queryString.del().then(result => {
            res.json({ success: true, message: 'ok' });
        });
        return;
    }
});


module.exports = router;
