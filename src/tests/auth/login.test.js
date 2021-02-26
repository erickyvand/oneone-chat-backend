import chai from 'chai';
import chaiHttp from 'chai-http';
import {
	BAD_REQUEST,
	INTERNAL_SERVER_ERROR,
	OK,
	UNAUTHORIZED,
} from 'http-status';
import server from '../../server';
import { invalidCredentials, loggedUser } from '../fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST login', () => {
	it('Should login a user', done => {
		chai
			.request(server)
			.post('/api/auth/login')
			.send(loggedUser)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.body.status.should.equal(OK);
				res.body.should.have.property('message');
				res.body.message.should.equal('Successfully logged in');
				res.body.should.have.property('data');
				res.body.data.should.be.an('object');
				res.body.data.should.have.property('user');
				res.body.data.user.should.be.an('object');
				res.body.data.user.should.have.property('id');
				res.body.data.user.should.have.property('fullname');
				res.body.data.user.should.have.property('email');
				res.body.data.user.should.have.property('socket');
				res.body.data.user.should.have.property('createdat');
				res.body.data.should.have.property('token');
			});
		done();
	});

	it('Should validate input fields', done => {
		chai
			.request(server)
			.post('/api/auth/login')
			.send({})
			.end((err, res) => {
				if (res !== undefined) {
					res.body.should.be.an('object');
					res.body.should.have.property('status');
					res.body.status.should.equal(BAD_REQUEST);
					res.body.should.have.property('message');
					res.body.message.should.be.an('array');
				}
			});
		done();
	});

	it('Should not login with invalid credentials', done => {
		chai
			.request(server)
			.post('/api/auth/login')
			.send(invalidCredentials)
			.end((err, res) => {
				if (res !== undefined) {
					res.body.should.be.an('object');
					res.body.should.have.property('status');
					res.body.status.should.equal(UNAUTHORIZED);
					res.body.should.have.property('message');
					res.body.message.should.equal('Invalid email or password');
				}
			});
		done();
	});

	it('Should check end of JSON input', done => {
		chai
			.request(server)
			.post('/api/auth/login')
			.end((err, res) => {
				if (res !== undefined) {
					res.body.should.be.an('object');
					res.body.should.have.property('status');
					res.body.status.should.equal(INTERNAL_SERVER_ERROR);
					res.body.should.have.property('message');
					res.body.message.should.equal('Unexpected end of JSON input');
				}
			});
		done();
	});
});
