import faker from 'faker';
import BcryptService from '../../services/bcrypt.service';

const password = faker.internet.password();
export const user = {
	fullName: faker.name.findName(),
	email: faker.internet.email(),
	password: BcryptService.hashPassword(password),
};
