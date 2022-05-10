
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = 'http://localhost:3000';
let should = chai.should();
let Cookies;
describe('crud api', () => {
  describe('Get jwttoken cookie', () => {
    it('should login and get token for valid user', function(done) {
      chai.request(server)
          .post('/login')
          .set('Accept', 'application/json')
          .send({'userName': 'teat123', 'password': 'passwd'})
          .end(function(err, res) {
            Cookies = res.headers['set-cookie'].pop().split(';')[0];
            Cookies.should.be.a('string');
            done();
          });
    });
  });
  describe('read product table', ()=>{
    it('it should GET all product', (done) => {
      chai.request(server)
          .get('/read')
          .set('Cookie', Cookies)
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.should.be.a('array');
            // res.body[0].id.should.equal(5);
            done();
          });
    });
  });
  describe('create a product ', ()=>{
    it('it should create a product and return success', (done) => {
      chai.request(server)
          .post('/create')
          .set('Cookie', Cookies)
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            product_name: '測試',
            price: 455,
            remark: 'Teat',
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
    it('it should return product_name invalid', (done) => {
      chai.request(server)
          .post('/create')
          .set('Cookie', Cookies)
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            price: 455,
            remark: 'Teat',
          })
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.success.should.equal(false);
            res.body.message.should.equal('product_name invalid');
            done();
          });
    });
  });
  describe('update a product ', ()=>{
    it('it should update a product and return success', (done) => {
      chai.request(server)
          .post('/update')
          .set('Cookie', Cookies)
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            product_name: '測試',
            price: 455,
            remark: 'Teat',
            price_update: 455,
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
    it('it should return missing any update value', (done) => {
      chai.request(server)
          .post('/update')
          .set('Cookie', Cookies)
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            product_name: '測試',
            price: 455,
            remark: 'Teat',
          })
          .end((err, res) => {
            if (err!=null) {
              console.log(err);
            }
            res.should.have.status(200);
            res.body.success.should.equal(false);
            res.body.message.should.equal('missing any update value');
            done();
          });
    });
  });
  describe('delete a product ', ()=>{
    it('it should delete a product', (done) => {
      chai.request(server)
          .post('/delete')
          .set('Cookie', Cookies)
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            product_name: '測試',
            price: 455,
            remark: 'Teat',
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
  });
});

chai.use(chaiHttp);
