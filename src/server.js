import http from 'http';
import socket from 'socket.io';
import routes from './routes';
import MessageService from './services/message.service';
import UserService from './services/user.service';

const app = http.createServer(routes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

const io = socket(server, {
	cors: {
		origin: process.env.FRONTEND_URL,
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	},
});

io.use((socket, next) => {
	const id = socket.handshake.query.id;
	socket.userId = id;
	next();
});

let users = [];
io.on('connection', async socket => {
	users[socket.userId] = socket.id;

	const messages = await MessageService.getMessages();

	io.emit('display_messages', messages.rows);

	socket.on('user_connected', async ({ id, fullName }) => {
		users[id] = socket.id;

		await UserService.updateUser(id, users[id]);
		await UserService.findUserById(socket.userId);
	});

	socket.on('send_message', async data => {
		const socketId = users[data.receiverId];

		await MessageService.createMessage({
			senderId: socket.userId,
			receiverId: data.receiverId,
			message: data.message,
			createdAt: new Date(),
		});

		const messages = await MessageService.getMessages();

		io.sockets.emit('display_messages', messages.rows);
	});

	socket.on('typing', data => {
		users[data.receiverId] = socket.id;
		const socketId = users[data.receiverId];

		socket.broadcast.to(socketId).emit('typing', { data, socketId });
	});

	socket.on('disconnect', async () => {
		await UserService.updateUserSocket(socket.id, '', new Date());

		const user = await UserService.findUserById(socket.userId);

		io.sockets.emit('connected_users', user);

		delete users[socket.userId];

		socket.disconnect();
	});
});

export default app;
