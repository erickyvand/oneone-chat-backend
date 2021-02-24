import http from 'http';
import routes from './routes';

const server = http.createServer(routes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

export default server;
