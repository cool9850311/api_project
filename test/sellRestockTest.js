
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = 'http://localhost:3000';
let should = chai.should();
let Cookies = -1;
describe('Sell api', () => {
  describe('Get jwttoken cookie', () => {
    it('should login and get token for valid user', function(done) {
      chai.request(server)
          .post('/login')
          .set('Accept', 'application/json')
          .send({'userName': 'teat123', 'password': 'passwd'})
          .end(function(err, res) {
            try {
              Cookies = res.headers['set-cookie'].pop().split(';')[0];
            } catch (err) {}
            Cookies.should.be.a('string');
            done();
          });
    });
  });
  describe('restock a product ', () => {
    it('it should restock a product and return success', (done) => {
      chai.request(server)
          .post('/restock')
          .set('Cookie', Cookies)
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
          .set('Cookie', Cookies)
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
    it('it should sell a product and return success', (done) => {
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
          .set('Cookie', Cookies)
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
    it('it should return json data invalid', (done) => {
      let tempObject = {
        'user_id': 123,
        'buy_product': [
          {
            'product_id': 1,
            'amount': 3,
            'remark': 'something',
          },
          {
            'amount': 30,
            'remark': 'something02',
          },
        ],
      };
      tempObject = JSON.stringify(tempObject);
      chai.request(server)
          .post('/sell')
          .set('Cookie', Cookies)
          .set('content-type', 'application/json')
          .send(tempObject)
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.success.should.equal(false);
            // eslint-disable-next-line max-len
            res.body.message.should.equal('json data buy_product.product_id invalid');
            done();
          });
    });
  });
  describe('update order ', ()=>{
    it('it should update a order and return success', (done) => {
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
          .set('Cookie', Cookies)
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
    it('it should return missing order_id', (done) => {
      let tempObject = {
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
          .set('Cookie', Cookies)
          .set('content-type', 'application/json')
          .send(tempObject)
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.success.should.equal(false);
            res.body.message.should.equal('missing order_id');
            done();
          });
    });
  });
  describe('search order ', ()=>{
    it('it should search a order and return an order json', (done) => {
      chai.request(server)
          .post('/searchOrder')
          .set('Cookie', Cookies)
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
    it('it should return missing order_id', (done) => {
      chai.request(server)
          .post('/searchOrder')
          .set('Cookie', Cookies)
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            order111_id: 'order1651742488971',
          })
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.success.should.equal(false);
            res.body.message.should.equal('missing order_id');
            done();
          });
    });
  });
});

chai.use(chaiHttp);
