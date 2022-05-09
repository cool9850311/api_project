
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = 'http://localhost:3000';
let should = chai.should();
describe('Sell api', () => {
  describe('restock a product ', ()=>{
    it('it should restock a product and return success', (done) => {
      chai.request(server)
          .post('/restock')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            user_id: '12',
            product_id: 1,
            amount: 100,
            remark: 'Test',
          })
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.success.should.equal(true);
            done();
          });
    });
    it('it should  return amount invalid', (done) => {
      chai.request(server)
          .post('/restock')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            user_id: '12',
            product_id: 1,
            amount: -1,
            remark: 'Test',
          })
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.success.should.equal(false);
            res.body.message.should.equal('amount invalid');
            done();
          });
    });
  });
  describe('sell a product ', ()=>{
    it('it should sell a product', (done) => {
      let tempObject = {
        'user_id': 123,
        'buy_product': [
          {
            'product_id': 1,
            'amount': 3,
            'remark': 'something',
          },
          {
            'product_id': 5,
            'amount': 30,
            'remark': 'something02',
          },
        ],
      };
      tempObject = JSON.stringify(tempObject);
      chai.request(server)
          .post('/sell')
          .set('content-type', 'application/json')
          .send(tempObject)
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.success.should.equal(true);
            done();
          });
    });
  });
  describe('update order ', ()=>{
    it('it should update a order', (done) => {
      let tempObject = {
        'order_id': 'order1651742488971',
        'buy_product': [
          {
            'product_id': 1,
            'amount': 3,
            'remark': 'something',
          },
          {
            'product_id': 5,
            'amount': 30,
            'remark': 'something02',
          },
        ],
      };
      tempObject = JSON.stringify(tempObject);
      chai.request(server)
          .post('/updateOrder')
          .set('content-type', 'application/json')
          .send(tempObject)
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.success.should.equal(true);
            done();
          });
    });
  });
  describe('search order ', ()=>{
    it('it should search a order', (done) => {
      chai.request(server)
          .post('/searchOrder')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            order_id: 'order1651742488971',
          })
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
    });
  });
});

chai.use(chaiHttp);
