import { CREATED, FORBIDDEN, NOT_FOUND } from 'http-status';
import MessageService from '../services/message.service';
import TokenService from '../services/token.service';
import UserService from '../services/user.service';
import {
	handleAuthorization,
	handleErrors,
	handleErrorResponse,
	messageSchema,
	handleSuccessResponse,
} from '../utils';

/**
 * Message class controller
 */
class MessageController {
	/**
	 * * Create a chat message
	 * @param  {object} req request
	 * @param  {object} res response
	 * @returns {object} object
	 */
	static async createChatMessage(req, res) {
		const { receiverId, message } = req.body;
		const bearerHeader = req.headers.authorization;

		if (typeof bearerHeader !== 'undefined') {
			handleAuthorization(bearerHeader, req, res);
			req.userData = TokenService.verifyToken(req.token);

			// validation
			const { error } = messageSchema.validate(req.body);

			if (error) {
				handleErrors(error, res);
			}

			// check user
			const user = await UserService.findUserById(receiverId);

			if (user.rows.length === 0 || user.rows[0].id === req.userData.id) {
				handleErrorResponse(NOT_FOUND, 'User not found', res);
			} else {
				const chatMessage = await MessageService.createMessage({
					senderId: req.userData.id,
					receiverId,
					message,
				});

				handleSuccessResponse(
					CREATED,
					'Message created successfully',
					chatMessage.rows[0],
					res
				);
			}
		} else {
			handleErrorResponse(
				FORBIDDEN,
				'You can not proceed without setting authorization token',
				res
			);
		}
	}
}

export default MessageController;
