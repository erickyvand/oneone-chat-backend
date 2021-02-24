import Joi from 'joi';
import { handleErrors } from '../utils';

export const validateSignupBody = (req, res) => {
	const schema = Joi.object({
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

	handleErrors(schema, req.body, res);
};
