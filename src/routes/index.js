import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status';
import AuthController from '../controllers/auth.controller';
import MessageController from '../controllers/message.controller';
import UserController from '../controllers/user.controller';
import ResponseService from '../services/response.service';
import { handleErrorResponse, handleSuccessResponse } from '../utils';

const routes = (req, res) => {
	let body = '';
	req.on('data', chunk => {
		body += chunk;
	});
	if (req.method === 'OPTIONS') {
		return handleSuccessResponse(OK, '', '', res);
	} else if (req.url === '/' && req.method === 'GET') {
		handleSuccessResponse(OK, 'One to one chat API', '', res);
	} else if (req.url === '/api/auth/signup' && req.method === 'POST') {
		req.on('end', async () => {
			try {
				req.body = JSON.parse(body);
				AuthController.signup(req, res);
			} catch (error) {
				handleErrorResponse(INTERNAL_SERVER_ERROR, error.message, res);
			}
		});
	} else if (req.url === '/api/auth/login' && req.method === 'POST') {
		req.on('end', async () => {
			try {
				req.body = JSON.parse(body);
				AuthController.login(req, res);
			} catch (error) {
				handleErrorResponse(INTERNAL_SERVER_ERROR, error.message, res);
			}
		});
	} else if (req.url === '/api/messages' && req.method === 'POST') {
		req.on('end', async () => {
			try {
				req.body = JSON.parse(body);
				MessageController.createChatMessage(req, res);
			} catch (error) {
				handleErrorResponse(INTERNAL_SERVER_ERROR, error.message, res);
			}
		});
	} else if (req.url === '/api/users' && req.method === 'GET') {
		UserController.getUsers(req, res);
	} else {
		ResponseService.setError(
			NOT_FOUND,
			'Route you are trying to access does not exists'
		);
		return ResponseService.send(res);
	}
};

export default routes;
