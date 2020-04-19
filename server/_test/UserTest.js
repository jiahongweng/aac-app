import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import httpStatus from 'http-status';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the user endpoints:', () => {
  it('It should create an user', (done) => {
    const user = {
      firstName: 'Austin',
      lastName: 'Smith',
      email: 'austin.smith@gmail.com',
      phone: '123.456.7890'
    };
    chai.request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.CREATED);
        expect(res.body.data).to.include({
          id: 1,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        });
        done();
      });
  });

  it('It should not create an user with incomplete parameters', (done) => {
    const user = {
      firstName: 'Austin',
      lastName: 'Smith'
    };
    chai.request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.BAD_REQUEST);
        done();
      });
  });

  it('It should get all users', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.OK);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('firstName');
        res.body.data[0].should.have.property('lastName');
        res.body.data[0].should.have.property('email');
        res.body.data[0].should.have.property('phone');
        done();
      });
  });

  it('It should get a particular user', (done) => {
    const userId = 1;
    chai.request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.OK);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('phone');
        done();
      });
  });

  it('It should not get a particular user with invalid id', (done) => {
    const userId = 8888;
    chai.request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.NOT_FOUND);
        res.body.should.have.property('message').eql(`Cannot find user with the id ${userId}`);
        done();
      });
  });

  it('It should not get a particular user with non-numeric id', (done) => {
    const userId = 'aaa';
    chai.request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.NOT_ACCEPTABLE);
        res.body.should.have.property('message').eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update an user', (done) => {
    const userId = 1;
    const updatedUser = {
      id: userId,
      firstName: 'Jone',
      lastName: 'Dae',
    };
    chai.request(app)
      .put(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .send(updatedUser)
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.OK);
        expect(res.body.data.id).equal(updatedUser.id);
        expect(res.body.data.firstName).equal(updatedUser.firstName);
        expect(res.body.data.lastName).equal(updatedUser.lastName);
        done();
      });
  });

  it('It should not update an user with invalid id', (done) => {
    const userId = '9999';
    const updatedUser = {
      id: userId,
      firstName: 'Jone',
      lastName: 'Dae',
    };
    chai.request(app)
      .put(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .send(updatedUser)
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.NOT_FOUND);
        res.body.should.have.property('message').eql(`Cannot find user with the id: ${userId}`);
        done();
      });
  });

  it('It should not update an user with non-numeric id value', (done) => {
    const userId = 'ggg';
    const updatedUser = {
      id: userId,
      firstName: 'Jone',
      lastName: 'Dae',
    };
    chai.request(app)
      .put(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .send(updatedUser)
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.NOT_ACCEPTABLE);
        res.body.should.have.property('message').eql('Please input a valid numeric value');
        done();
      });
  });


  it('It should delete an user', (done) => {
    const userId = 1;
    chai.request(app)
      .delete(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.OK);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete an user with invalid id', (done) => {
    const userId = 777;
    chai.request(app)
      .delete(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.NOT_FOUND);
        res.body.should.have.property('message').eql(`User with the id ${userId} cannot be found`);
        done();
      });
  });

  it('It should not delete an user with non-numeric id', (done) => {
    const userId = 'bbb';
    chai.request(app)
      .delete(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(httpStatus.NOT_ACCEPTABLE);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  });
});
