import chai from 'chai';
import chaiHttp from 'chai-http';
import {
	CREATED,
	FORBIDDEN,
	INTERNAL_SERVER_ERROR,
	UNAUTHORIZED,
} from 'http-status';
import server from '../../server';
import { chatMessage } from '../fixtures/message.fixture';
import { expiredToken, loggedInToken } from '../fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST messages', () => {
	it('It should create a message', done => {
		chai
			.request(server)
			.post('/api/messages')
			.set('Authorization', `Bearer ${loggedInToken}`)
			.send(chatMessage)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.status.should.equal(CREATED);
				res.body.should.have.property('message');
			});
		done();
	});

	it('Should not access route without setting authorization', done => {
		chai
			.request(server)
			.post('/api/messages')
			.send({})
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.body.status.should.equal(FORBIDDEN);
				res.body.should.have.property('message');
				res.body.message.should.equal(
					'You can not proceed without setting authorization token'
				);
			});
		done();
	});

	it('Should check if token is invalid', done => {
		chai
			.request(server)
			.post('/api/messages')
			.set('Authorization', 'Bearer')
			.send({})
			.end((err, res) => {
				if (res !== undefined) {
					res.body.should.be.an('object');
					res.body.should.have.property('status');
					res.body.status.should.equal(UNAUTHORIZED);
					res.body.should.have.property('message');
					res.body.message.should.equal('Unauthorized, invalid token');
				}
			});
		done();
	});

	it('Should check if token has expired', done => {
		chai
			.request(server)
			.post('/api/messages')
			.set('Authorization', `Bearer ${expiredToken}`)
			.send({})
			.end((err, res) => {
				if (res !== undefined) {
					res.body.should.be.an('object');
					res.body.should.have.property('status');
					res.body.status.should.equal(UNAUTHORIZED);
					res.body.should.have.property('message');
					res.body.message.should.equal(
						'Unauthorized, Token has expired signin again to get new token'
					);
				}
			});
		done();
	});

	it('Should check end of JSON input', done => {
		chai
			.request(server)
			.post('/api/messages')
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.body.status.should.equal(INTERNAL_SERVER_ERROR);
				res.body.should.have.property('message');
				res.body.message.should.equal('Unexpected end of JSON input');
			});
		done();
	});
});
