import faker from 'faker';
import BcryptService from '../../services/bcrypt.service';
import TokenService from '../../services/token.service';
import UserService from '../../services/user.service';

const password = faker.internet.password();
export const user = {
	fullName: faker.name.findName(),
	email: faker.internet.email(),
	password: BcryptService.hashPassword(password),
};

const newUser = {
	id: faker.random.number({ min: 10, max: 15 }),
	fullName: faker.name.findName(),
	email: faker.internet.email(),
	password: BcryptService.hashPassword(password),
};

const userToChat = {
	id: faker.random.number({ min: 2, max: 2 }),
	fullName: faker.name.findName(),
	email: faker.internet.email(),
	password: BcryptService.hashPassword(password),
};

export const userToChatId = userToChat.id;

export const loggedUser = {
	email: newUser.email,
	password,
};

export const loggedInToken = TokenService.generateToken(newUser);
export const expiredToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkpvNEBnbWFpbC5jb20iLCJwYXNzd29yZCI6Ilp4MFhfSUdIUVI4U19XQyIsImlhdCI6MTYxNDM1NDM4MCwiZXhwIjoxNjE0MzU0NDQwfQ.gFS0eldCnxfDVkQE-zU8NChPzJU4NoXoILnIV8ZUFIU';

export const invalidCredentials = {
	email: faker.internet.email(),
	password,
};

export const createUsers = async () => {
	await UserService.createUser(newUser);
	await UserService.createUser(userToChat);
};
