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
	static createMessage({ senderId, receiverId, message }) {
		return pool.query(
			'INSERT INTO messages(senderId, receiverId, message) VALUES($1, $2, $3) RETURNING id, senderId, receiverId, createdAt',
			[senderId, receiverId, message]
		);
	}

	/**
	 * Delete all messages records
	 */
	static deleteMessagesTable() {
		return pool.query('DELETE FROM messages');
	}
}

export default MessageService;
