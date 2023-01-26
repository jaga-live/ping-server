import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { container } from '../../../core/inversify/inversify.config';
import { TYPES } from '../../../core/inversify/types';
import { SocketProvider } from '../../../core/providers/sockets.provider';
import { ChatEventsHandler } from '../../../handlers/sockets/chat_events.handler';
import { RedisService } from '../../../shared/redis/redis.service';
import Chats from '../model/chats.model';
import { ChatRepository } from '../repository/chat.repository';


@injectable()
export class ChatService{
	constructor(
        @inject(ChatRepository) private readonly chatRepo: ChatRepository,
        @inject(TYPES.RedisService) private readonly redisService: RedisService,
	) { }

	///Create
	async create_group_chat(userId: Types.ObjectId, payload: any) {

		const createChat = await this.chatRepo.create({
			chatType: 'GROUP_DM',
			users: payload.users,
			createdBy: userId
		});

		///Emit New Chat Event
		//Fetch Users
		const socketIds = await this.redisService.fetchMultipleSets(payload.users);
		if (socketIds.length !== 0) {
			const io = container.get(SocketProvider);
			io.getIO().in(socketIds).emit('create_dm', { message: 'create DM' });
		}

		return createChat;
	}

	///Get
	async get_all_chats(userId: Types.ObjectId) {
		
		const chats = await Chats.aggregate([
			{
				$match: {
					users: userId
				}
			},
			{
				$addFields: {_users: '$users'}
			},
			{
				$unwind: '$_users'
			},
			{
				$match: {
					_users: {$ne: userId}
				}
			},
			{
				$lookup: {
					from: 'users',
					localField: '_users',
					foreignField: '_id',
					as: 'user'
				}
			},
			{ $unwind: '$user' },
			{ $project: { _users: 0 } }
			
		]);

		return chats;
	}
    
}