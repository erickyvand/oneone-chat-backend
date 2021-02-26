import MessageService from '../../services/message.service';
import UserService from '../../services/user.service';

const cleanAllTables = async () => {
	await UserService.deleteUsersTable();
	await MessageService.deleteMessagesTable();
};

export default cleanAllTables;
