import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify/types';
import { ChatRepository } from '../../chats/repository/chat.repository';
import Message from '../model/message.model';


@injectable()
export class MessageService{
	constructor(
        @inject(ChatRepository) private readonly chatRepo: ChatRepository
	){}

	async get_message_by_chatId(chatId: Types.ObjectId, userId: Types.ObjectId, query: any) {
		///Validate Chat Permission
		const getChat = await this.chatRepo.getOne(chatId);
		if (!getChat || !(getChat?.users).includes(userId)) throw new HttpException('You have no access to this Chat', 400);
		
		const getQuery: any = await this.buildQuery(query);
		if (!getQuery.isValid) throw new HttpException('Invalid Query', 400);
		
		const messages = await Message.aggregate([
			{
				$match: { chatId }
			},
			{
				$sort: { _id: -1 }
			},
			///Limit & Before Query
			 ...getQuery.query,
			{ $sort: { _id: 1 } }
		]);

		return messages;
	}

	private async buildQuery(query: any) {
		const _query = { isValid: true, query: [] };

		const limit = query.limit;
		const before = query.before;

		
		// Validate Before
		if (before && !Types.ObjectId.isValid(before)){
			_query.isValid = false;
			return _query;
		}
		_query.query.push({
			$match: {
				_id: {$lt: new Types.ObjectId(before)}
			}
		});

		///Validate Limit
		if (!limit || parseInt(limit) > 50) {
			_query.isValid = false;
			return _query;
		}
		///Query for Limit
		_query.query.push({ $limit: parseInt(limit) });
		

		return _query;

	}
}