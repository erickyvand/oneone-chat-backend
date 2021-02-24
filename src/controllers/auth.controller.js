import { CREATED } from 'http-status';
import ResponseService from '../services/response.service';

/**
 * Auth controller class
 */
class AuthController {
	static async signup(req, res) {
		ResponseService.setSuccess(CREATED, 'signup');
		return ResponseService.send(res);
	}
}

export default AuthController;
