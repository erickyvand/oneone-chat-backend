import pool from '../database/config/config';

class UserService {
	static createUser({ fullName, email, password }) {
		return pool.query(
			'INSERT INTO users(fullName, email, password) VALUES($1, $2, $3) RETURNING id, fullName, email, socket, createdAt',
			[fullName, email, password]
		);
	}

	static findUserByEmail(email) {
		return pool.query('SELECT * FROM users WHERE email = $1', [email]);
	}

	static deleteUsersTable() {
		return pool.query('DELETE FROM users');
	}
}

export default UserService;
