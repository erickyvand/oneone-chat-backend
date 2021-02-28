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
	static createUser({ fullName, email, password, createdAt, updatedAt }) {
		return pool.query(
			'INSERT INTO users(fullName, email, password, createdAt, updatedAt) VALUES($1, $2, $3,$4,$5) RETURNING id, fullName, email, socket, createdAt, updatedAt',
			[fullName, email, password, createdAt, updatedAt]
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
	 * @param  {integer} id ID of the user
	 * @returns {object} object
	 */
	static findUserById(id) {
		return pool.query('SELECT * FROM users WHERE id = $1', [id]);
	}

	/**
	 * * Find all users except authenticated user
	 * @param  {integer} id ID of the user
	 * @returns {object} object
	 */
	static findUsers(id) {
		return pool.query('SELECT * FROM users WHERE id != $1 ORDER BY fullname', [
			id,
		]);
	}

	/**
	 * * Update user
	 * @param  {integer} id ID of the user
	 * @param  {string} socket socket
	 * @returns {object} object
	 */
	static updateUser(id, socket) {
		return pool.query('UPDATE users SET socket = $2 WHERE id = $1', [
			id,
			socket,
		]);
	}

	/**
	 * * Update user socket
	 * @param  {string} socket socket
	 * @param  {string} updatedSocket socket
	 * @param  {string} updatedAt date time
	 * @returns {object} object
	 */
	static updateUserSocket(socket, updatedSocket, updatedAt) {
		return pool.query(
			'UPDATE users SET socket = $2, updatedAt = $3 WHERE socket = $1',
			[socket, updatedSocket, updatedAt]
		);
	}

	/**
	 * Delete all users records
	 */
	static deleteUsersTable() {
		return pool.query('DELETE FROM users');
	}
}

export default UserService;
