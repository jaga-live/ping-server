import { Server } from 'socket.io';


export class Socket{

	async connect(server) {
		const io = new Server(server, {
			cors: {
				origin: '*'
			}
		});

		io.on('connection', (socket) => {
			console.log('Connected to Socket');
			socket.on('setup', (userData) => {
				console.log(userData);
				socket.join('abcdef');
			});
		});
	}
}