import faker from 'faker';
import { userToChatId } from './user.fixture';

export const chatMessage = {
	receiverId: userToChatId,
	message: faker.lorem.sentence(),
};

export const newChatMessage = {
	receiverId: faker.random.number({ min: 4, max: 4 }),
	message: faker.lorem.sentence(),
};
