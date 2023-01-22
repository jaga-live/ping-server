import { inject, injectable } from 'inversify';
import { SocketProvider } from '../../core/providers/sockets.provider';


@injectable()
export class ChatEventsHandler {
    @inject(SocketProvider) private socketProvider: SocketProvider;

    public handleConnection() {
    	const io = this.socketProvider.getIO();
    	io.on('connection', (socket) => {
    		console.log('Connected to Client');

    		/// Join room for DM and Group
    		socket.on('private_chat', async (data) => {
    			console.log('Join private room', data);
    			const { _id } = data;
    			socket.leave(_id);
    			socket.join(_id);
    		});

    		///Receive Message
    		socket.on('message', async (data) => {
    			console.log('Private message', data);
    			const { _id, message } = data;

    			///Send message to room
    			io.to(_id).emit('message', message);
    		});
		
    	});
    }
}