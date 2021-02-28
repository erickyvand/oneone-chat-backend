import { FORBIDDEN, OK } from 'http-status';
import TokenService from '../services/token.service';
import UserService from '../services/user.service';
import {
	handleAuthorization,
	handleErrorResponse,
	handleSuccessResponse,
} from '../utils';

/**
 * User controller class
 */
class UserController {
	/**
	 * * Get users
	 * @param  {object} req request
	 * @param  {object} res response
	 * @return {object} object
	 */
	static async getUsers(req, res) {
		const bearerHeader = req.headers.authorization;

		if (typeof bearerHeader !== 'undefined') {
			handleAuthorization(bearerHeader, req, res);
			req.userData = TokenService.verifyToken(req.token);

			const users = await UserService.findUsers(req.userData.id);

			handleSuccessResponse(OK, 'List of users', users.rows, res);
		} else {
			handleErrorResponse(
				FORBIDDEN,
				'You can not proceed without setting authorization token',
				res
			);
		}
	}
}

export default UserController;
