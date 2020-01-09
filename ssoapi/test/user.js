process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

let test_token = null;
let test_userid = null;
let test_user = {
    name: 'test user',
    address: 'test user adderess',
    email: 'testuser@test',
    password: 'testuser',
    phone: '+91 0000000000',
    status: 1
};

var limit = 10;
var offset = 0;

chai.use(chaiHttp);

before((done) => {
    chai.request(app)
        .post('/oauth/token')
        .type('form')
        .send({
            grant_type: 'password',
            client_id: 'baf50a1c-1a7d-11ea-978f-2e728ce88125',
            username: 'admin@system',
            password: 'admin'
        })
        .end((err, res) => {
            test_token = res.body.response.accessToken;
            done();
        });
})

describe('User', () => {
    it('Get /admin/users/:limit/:offset - get all users', (done) => {
        chai.request(app)
        .get('/admin/users/' + limit + '/' + offset)
        .set('Authorization', 'Bearer ' + test_token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.response.should.be.a('array');
            done();
        });
    });

    it('POST /admin/users - save new user', (done) => {
        chai.request(app)
        .post('/admin/users')
        .set('Authorization', 'Bearer ' + test_token)
        .type('form')
        .send(test_user)
        .end((err, res) => {
            res.should.have.status(200);
            test_userid = res.body.response;
            done();
        });
    });

    it('Get /admin/users/:userid - get user', (done) => {
        chai.request(app)
        .get('/admin/users/' + test_userid)
        .set('Authorization', 'Bearer ' + test_token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.response.should.be.a('array');
            done();
        });
    });

    it('PUT /admin/users/:userid - update user', (done) => {
        chai.request(app)
        .put('/admin/users/' + test_userid)
        .set('Authorization', 'Bearer ' + test_token)
        .type('form')
        .send(test_user)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });

    it('DELETE /admin/users/:userid - delete user', (done) => {
        chai.request(app)
        .delete('/admin/users/' + test_userid)
        .set('Authorization', 'Bearer ' + test_token)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});