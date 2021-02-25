import { CREATED, INTERNAL_SERVER_ERROR } from 'http-status';
import ResponseService from '../services/response.service';
import UserService from '../services/user.service';
import BcryptService from '../services/bcrypt.service';
import { validateSignupBody } from '../validations/user.validation';
import { checkUserExists } from '../middlewares/user.middleware';

/**
 * Auth controller class
 */
class AuthController {
	static signup(req, res) {
		let body = '';
		req.on('data', chunk => {
			body += chunk;
		});
		req.on('end', async () => {
			try {
				req.body = JSON.parse(body);
				const { fullName, email, password } = req.body;

				validateSignupBody(req, res);
				checkUserExists(email, res);

				const user = await UserService.createUser({
					fullName,
					email,
					password: BcryptService.hashPassword(password),
				});

				ResponseService.setSuccess(
					CREATED,
					'User created successfully',
					user.rows[0]
				);
				return ResponseService.send(res);
			} catch (error) {
				ResponseService.setError(
					INTERNAL_SERVER_ERROR,
					'Unexpected end of JSON input'
				);
				return ResponseService.send(res);
			}
		});
	}
}

export default AuthController;
