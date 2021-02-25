import UserService from '../../services/user.service';

const cleanAllTables = async () => {
	await UserService.deleteUsersTable();
};

export default cleanAllTables;
