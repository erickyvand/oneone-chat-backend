import { CONFLICT } from 'http-status';
import ResponseService from '../services/response.service';
import UserService from '../services/user.service';

export const checkUserExists = async (email, res) => {
	const userExist = await UserService.findUserByEmail(email);

	if (userExist.rows.length > 0) {
		ResponseService.setError(CONFLICT, 'User with email already exists');
		return ResponseService.send(res);
	}
};
