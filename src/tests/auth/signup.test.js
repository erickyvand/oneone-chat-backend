import chai from 'chai';
import chaiHttp from 'chai-http';
import {
	BAD_REQUEST,
	CONFLICT,
	CREATED,
	INTERNAL_SERVER_ERROR,
} from 'http-status';
import server from '../../server';
import cleanAllTables from '../fixtures/database.fixture';
import { user } from '../fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST signup', async () => {
	before(async () => {
		await cleanAllTables();
	});

	it('Should signup a user', done => {
		chai
			.request(server)
			.post('/api/auth/signup')
			.send(user)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.body.status.should.equal(CREATED);
				res.body.should.have.property('message');
				res.body.message.should.equal('User created successfully');
				res.body.should.have.property('data');
				res.body.data.should.have.property('id');
				res.body.data.should.have.property('fullname');
				res.body.data.should.have.property('email');
				res.body.data.should.have.property('socket');
				res.body.data.should.have.property('createdat');
			});
		done();
	});

	it('Should check end of JSON input', done => {
		chai
			.request(server)
			.post('/api/auth/signup')
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.body.status.should.equal(INTERNAL_SERVER_ERROR);
				res.body.should.have.property('message');
				res.body.message.should.equal('Unexpected end of JSON input');
			});
		done();
	});

	it('Should validate input fields', done => {
		chai
			.request(server)
			.post('/api/auth/signup')
			.send({})
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.body.status.should.equal(BAD_REQUEST);
				res.body.should.have.property('message');
				res.body.message.should.be.an('array');
			});
		done();
	});

	it('Should check if email exists', done => {
		chai
			.request(server)
			.post('/api/auth/signup')
			.send(user)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.body.status.should.equal(CONFLICT);
				res.body.should.have.property('message');
				res.body.message.should.equal('User with email already exists');
			});
		done();
	});
});
