import { inject, injectable } from 'inversify';
import { SocketProvider } from '../../core/providers/sockets.provider';
import { ChatEventsHandler } from '../../handlers/sockets/chat_events.handler';


@injectable()
export class ChatEvents {
	constructor(
		@inject(SocketProvider) private socketProvider: SocketProvider,
		@inject(ChatEventsHandler) private chatEventsHandler: ChatEventsHandler,
	){}

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
				const auth = await this.socketProvider.authMiddleware(socket);
				if (!auth?.isAuthenticated) return;

    			console.log('Private message', data);
    			const { _id, message } = data;

    			///Send message to room
				const inRoom = socket.rooms.has(data._id);
				if (!inRoom) socket.join(_id);
				
				io.in(_id).emit('message', message);

				///Chats Handler
				data.messageType = 'DM';
				this.chatEventsHandler.handle(auth.userData, data);
    		});
		
    	});
	}
}