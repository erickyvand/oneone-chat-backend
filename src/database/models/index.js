import pool from '../config/config';

const usersTable = `
  DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fullName character varying(250) NOT NULL,
    email character varying(250) NOT NULL,
    password character varying(250) NOT NULL,
    socket character varying(250) NOT NULL DEFAULT '',
    createdAt DATE DEFAULT NOW()
  );
`;

const messagesTable = `
  DROP TABLE IF EXISTS messages CASCADE;
  CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    senderId integer NOT NULL,
    receiverId integer NOT NULL,
    message text NOT NULL,
    createdAt DATE DEFAULT NOW()
  );
`;

const tableSchema = `
  ${usersTable}
  ${messagesTable}
`;

(async () => {
	try {
		await pool.query(tableSchema);
	} catch (error) {
		console.log(error);
	}
})();
