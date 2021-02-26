import pool from '../database/config/config';

/**
 * User service class
 */
class UserService {
	/**
	 * * Create a user into a database
	 * @param  {string} fullName Full name of the user
	 * @param  {string} email Email of the user
	 * @param  {string} password Password of the user
	 * @returns {object} object
	 */
	static createUser({ fullName, email, password }) {
		return pool.query(
			'INSERT INTO users(fullName, email, password) VALUES($1, $2, $3) RETURNING id, fullName, email, socket, createdAt',
			[fullName, email, password]
		);
	}

	/**
	 * * Find user a user by inserting his email
	 * @param  {string} email Email of the user
	 * @returns {object} object
	 */
	static findUserByEmail(email) {
		return pool.query('SELECT * FROM users WHERE email = $1', [email]);
	}

	/**
	 * * Find user a user by ID
	 * @param  {integer} id Email of the user
	 * @returns {object} object
	 */
	static findUserById(id) {
		return pool.query('SELECT * FROM users WHERE id = $1', [id]);
	}

	/**
	 * Delete all users records
	 */
	static deleteUsersTable() {
		return pool.query('DELETE FROM users');
	}
}

export default UserService;
