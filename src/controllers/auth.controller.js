import { CREATED, UNAUTHORIZED, OK, CONFLICT } from 'http-status';
import UserService from '../services/user.service';
import BcryptService from '../services/bcrypt.service';
import TokenService from '../services/token.service';
import {
	handleErrors,
	handleErrorResponse,
	loginSchema,
	signupSchema,
	handleSuccessResponse,
} from '../utils';

/**
 * Auth controller class
 */
class AuthController {
	/**
	 * * Signup a user
	 * @param  {object} req request
	 * @param  {object} res response
	 * @returns {object} object
	 */
	static async signup(req, res) {
		const { fullName, email, password } = req.body;

		// validation
		const { error } = signupSchema.validate(req.body);

		if (error) {
			handleErrors(error, res);
		}
		const userExist = await UserService.findUserByEmail(email);

		// check if user email exists
		if (userExist.rows.length > 0) {
			handleErrorResponse(CONFLICT, 'User with email already exists', res);
		} else {
			const user = await UserService.createUser({
				fullName,
				email,
				password: BcryptService.hashPassword(password),
			});

			handleSuccessResponse(
				CREATED,
				'User created successfully',
				user.rows[0],
				res
			);
		}
	}

	/**
	 * * Login a user
	 * @param  {object} req request
	 * @param  {object} res response
	 * @returns {object} object
	 */
	static async login(req, res) {
		const { email, password } = req.body;

		// validation
		const { error } = loginSchema.validate(req.body);
		if (error) {
			handleErrors(error, res);
		}

		// check authentication
		const user = await UserService.findUserByEmail(email);
		if (
			user.rows.length === 0 ||
			!BcryptService.comparePassword(password, user.rows[0].password)
		) {
			handleErrorResponse(UNAUTHORIZED, 'Invalid email or password', res);
		}
		const userData = { ...user.rows[0] };
		delete userData.password;
		handleSuccessResponse(
			OK,
			'Successfully logged in',
			{
				user: userData,
				token: TokenService.generateToken(userData),
			},
			res
		);
	}
}

export default AuthController;
