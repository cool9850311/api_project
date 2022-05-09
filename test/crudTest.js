
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = 'http://localhost:3000';
let should = chai.should();
describe('crud api', () => {
  describe('read product table', ()=>{
    it('it should GET all product', (done) => {
      chai.request(server)
          .get('/read')
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
    it('it should create a product', (done) => {
      chai.request(server)
          .post('/create')
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
  describe('update a product ', ()=>{
    it('it should update a product', (done) => {
      chai.request(server)
          .post('/update')
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
  });
  describe('delete a product ', ()=>{
    it('it should delete a product', (done) => {
      chai.request(server)
          .post('/delete')
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
