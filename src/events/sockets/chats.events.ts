import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/inversify/types';
import { SocketProvider } from '../../core/providers/sockets.provider';
import { ChatEventsHandler } from '../../handlers/sockets/chat_events.handler';
import { RedisService } from '../../shared/redis/redis.service';
import { MessageRepository } from '../../api/message/repository/message.repository';

@injectable()
export class ChatEvents {
	constructor(
		@inject(SocketProvider) private socketProvider: SocketProvider,
		@inject(ChatEventsHandler) private chatEventsHandler: ChatEventsHandler,
		@inject(TYPES.RedisService) private redisService: RedisService,
		@inject(MessageRepository) private readonly messageRepo: MessageRepository,
	){}

	public handleConnection() {
		const io = this.socketProvider.getIO();
		
		io.on('connection', async (socket) => {
			const auth = await this.socketProvider.authMiddleware(socket);
			if (!auth?.isAuthenticated) return;
    		
			console.log('Connected to Client');
			
			///Save socket ID
			await this.redisService.sAdd(auth.userId, socket.id);

			///Socket Disconnect Handle
			socket.on('disconnect', async() => {
				await this.redisService.srem(auth.userId, socket.id);
			});

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
    			const { _id, message, sender } = data;

    			///Send message to room
				const inRoom = socket.rooms.has(data._id);
				if (!inRoom) socket.join(_id);
				
				///Save Message
				const messagePayload = {
					chatId: _id,
					type: 'DM',
					message,
					sender 
				};
				const saveMessage = await this.messageRepo.create(messagePayload)
				console.log(saveMessage, 'Save Message')

				io.in(_id).emit('message', {
					...data,
					_id: saveMessage._id
				});
				
				///Chats Handler
				data.messageType = 'DM';
				this.chatEventsHandler.handle(auth.userData, data);
			});
		
    	});
	}
}
