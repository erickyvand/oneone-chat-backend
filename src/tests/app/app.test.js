import chai from 'chai';
import chaiHttp from 'chai-http';
import { NOT_FOUND, OK } from 'http-status';
import server from '../../server';

chai.should();
chai.use(chaiHttp);

describe('App', () => {
	it('Should check options method', done => {
		chai
			.request(server)
			.options('')
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.body.status.should.be.a('number');
				res.body.status.should.equal(OK);
				res.body.should.have.property('message');
			});
		done();
	});
	it('Should show welcome message on root route', done => {
		chai
			.request(server)
			.get('/')
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.body.status.should.be.a('number');
				res.body.status.should.equal(OK);
				res.body.should.have.property('message');
				res.body.message.should.be.a('string');
				res.body.message.should.equal('One to one chat API');
			});
		done();
	});

	it('Should return not found message when a wrong root has been provided', done => {
		chai
			.request(server)
			.get('/app')
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('status');
				res.body.status.should.be.a('number');
				res.body.status.should.equal(NOT_FOUND);
				res.body.should.have.property('message');
				res.body.message.should.be.a('string');
				res.body.message.should.equal(
					'Route you are trying to access does not exists'
				);
			});
		done();
	});
});
