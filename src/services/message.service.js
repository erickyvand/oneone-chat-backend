import pool from '../database/config/config';

/**
 * Message class service
 */
class MessageService {
	/**
	 * * create message
	 * @param  {integer} senderId id
	 * @param  {integer} receiverId id
	 * @param  {string} message text
	 */
	static createMessage({ senderId, receiverId, message, createdAt }) {
		return pool.query(
			'INSERT INTO messages(senderId, receiverId, message, createdAt) VALUES($1, $2, $3, $4) RETURNING id, senderId, receiverId, message, createdAt',
			[senderId, receiverId, message, createdAt]
		);
	}

	/**
	 * * get messages
	 * @retuns object
	 */
	static getMessages() {
		return pool.query('SELECT * FROM messages');
	}

	/**
	 * Delete all messages records
	 */
	static deleteMessagesTable() {
		return pool.query('DELETE FROM messages');
	}
}

export default MessageService;
