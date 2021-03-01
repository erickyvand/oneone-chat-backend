import { BAD_REQUEST, UNAUTHORIZED } from 'http-status';
import Joi from 'joi';
import ResponseService from '../services/response.service';
import TokenService from '../services/token.service';

export const signupSchema = Joi.object({
	fullName: Joi.string().trim().min(2).required().messages({
		'any.required': 'Full name is required',
		'string.empty': 'Full name is not allowed to be empty',
		'string.min': 'Full name length must be at least 2 characters long',
	}),
	email: Joi.string().email().required().messages({
		'any.required': 'Email is required',
		'string.empty': 'Email is not allowed to be empty',
		'string.email': 'Email must be a valid email',
	}),
	password: Joi.string().trim().min(6).required().messages({
		'any.required': 'Password is required',
		'string.empty': 'Password is not allowed to be empty',
		'string.min': 'Password length must be at least 6 characters long',
	}),
}).options({ abortEarly: false });

// ***********************************************************************

export const loginSchema = Joi.object({
	email: Joi.string().email().required().messages({
		'any.required': 'Email is required',
		'string.empty': 'Email is not allowed to be empty',
		'string.email': 'Email must be a valid email',
	}),
	password: Joi.string().trim().required().messages({
		'any.required': 'Password is required',
		'string.empty': 'Password is not allowed to be empty',
	}),
}).options({ abortEarly: false });

// ***********************************************************************

export const messageSchema = Joi.object({
	receiverId: Joi.number().required().messages({
		'any.required': 'Receiver ID is required',
		'string.empty': 'Receiver ID is not allowed to be empty',
		'number.base': 'Receiver ID must be a number',
	}),
	message: Joi.string().allow('').required().messages({
		'any.required': 'message is required',
		'string.empty': 'Message must not be empty',
	}),
}).options({ abortEarly: false });

// ***********************************************************************

/**
 * * Handle error response
 * @param  {integer} status status code
 * @param  {string} message Error message
 * @param  {object} res response
 * @returns {object} object
 */
export const handleErrorResponse = (status, message, res) => {
	ResponseService.setError(status, message);
	return ResponseService.send(res);
};

// ***********************************************************************

/**
 * * Handle success response
 * @param  {integer} status status code
 * @param  {string} message success message
 * @param  {data} data data
 * @param  {object} res response
 * @returns {object} object
 */
export const handleSuccessResponse = (status, message, data, res) => {
	ResponseService.setSuccess(status, message, data);
	return ResponseService.send(res);
};

// ***********************************************************************

/**
 * * Response Errors
 * @param  {object} error errors
 * @param  {object} res response
 * @returns {object} object
 */
export const handleErrors = (error, res) => {
	const errors = error.details.map(err => err.message);
	ResponseService.setError(BAD_REQUEST, errors);
	return ResponseService.send(res);
};

// ***********************************************************************

/**
 * * Handle authorization
 * @param  {object} bearerHeader headers
 * @param  {object} req request
 * @param  {object} res response
 * @returns {object} object
 */
export const handleAuthorization = (bearerHeader, req, res) => {
	const bearer = bearerHeader.split(' ');
	const bearerToken = bearer[1];
	req.token = bearerToken;
	const { name } = TokenService.verifyToken(req.token);

	if (name === 'JsonWebTokenError') {
		handleErrorResponse(UNAUTHORIZED, 'Unauthorized, invalid token', res);
	}

	if (name === 'TokenExpiredError') {
		handleErrorResponse(
			UNAUTHORIZED,
			'Unauthorized, Token has expired signin again to get new token',
			res
		);
	}

	req.userData = TokenService.verifyToken(req.token);
};
