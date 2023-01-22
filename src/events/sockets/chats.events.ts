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
				console.log('Join private room')
				const { _id } = data
				socket.join(_id)
			});

			socket.on('send_private_message', async (data) => {
				console.log('Private message')
				const { _id, message } = data;
				socket.to(_id).emit('receive_private_message', message);
			});
		
    	});
    }
}