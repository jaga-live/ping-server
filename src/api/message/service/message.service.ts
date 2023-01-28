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
		let getChat = await this.chatRepo.getOne(chatId)
		if (!getChat || !(getChat?.users).includes(userId)) throw new HttpException('You have no access to this Chat', 400)
		
		const getQuery: any = await this.buildQuery(query)
		if (!getQuery.isValid) throw new HttpException('Invalid Query', 400)
		
		const messages = await Message.aggregate([
			{
				$match: { chatId }
			},
			///Limit Query
			{...getQuery.query},
			{
				$sort: { _id: -1 }
			}
		])

		return messages
	}

	private async buildQuery(query: any) {
		let _query = { isValid: true, query: {} };

		let limit = query.limit
		let before = query.before

		if (!limit || parseInt(limit) > 50) {
			_query.isValid = false
		}
		else { 
			_query.query = { $limit: parseInt(limit) }
		}

		return _query

	}
}