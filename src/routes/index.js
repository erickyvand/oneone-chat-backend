import { NOT_FOUND, OK } from 'http-status';
import AuthController from '../controllers/auth.controller';
import ResponseService from '../services/response.service';

const routes = (req, res) => {
	if (req.url === '/' && req.method === 'GET') {
		ResponseService.setSuccess(OK, 'One to one chat API');
		return ResponseService.send(res);
	} else if (req.url === '/api/auth/signup' && req.method === 'POST') {
		AuthController.signup(req, res);
	} else {
		ResponseService.setError(
			NOT_FOUND,
			'Route you are trying to access does not exists'
		);
		return ResponseService.send(res);
	}
};

export default routes;
