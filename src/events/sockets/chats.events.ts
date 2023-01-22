import { inject, injectable } from 'inversify';
import { SocketProvider } from '../../core/providers/sockets.provider';


@injectable()
export class ChatEventsHandler {
    @inject(SocketProvider) private socketProvider: SocketProvider;

    public handleConnection() {
    	this.socketProvider.getIO().on('connection', (socket) => {
			console.log('connected to client')

    		/// Join room for DM and Group
			socket.on('private_chat', async (data) => {
				console.log('Join private room', data)
				const { _id } = data
				socket.leave(_id)
				socket.join(_id)
			});

			socket.on('message', async (data) => {
				console.log('Private message', data)
				const { _id, message } = data;
				socket.in(_id).emit('message', message);
			});
		
    	});
    }
}