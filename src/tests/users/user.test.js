import chai from 'chai';
import chaiHttp from 'chai-http';
import { FORBIDDEN, OK } from 'http-status';
import server from '../../server';
import { loggedInToken } from '../fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/GET get users', () => {
	it('It should get users', done => {
		chai
			.request(server)
			.get('/api/users')
			.set('Authorization', `Bearer ${loggedInToken}`)
			.end((err, res) => {
				res.body.should.have.property('status');
				res.body.status.should.equal(OK);
				res.body.should.have.property('message');
				res.body.message.should.equal('List of users');
				res.body.should.have.property('data');
				res.body.data.should.be.an('array');
			});
		done();
	});

	it('Should not access route without setting authorization', done => {
		chai
			.request(server)
			.get('/api/users')
			.send({})
			.end((err, res) => {
				if (res !== undefined) {
					res.body.should.be.an('object');
					res.body.should.have.property('status');
					res.body.status.should.equal(FORBIDDEN);
					res.body.should.have.property('message');
					res.body.message.should.equal(
						'You can not proceed without setting authorization token'
					);
				}
			});
		done();
	});
});
