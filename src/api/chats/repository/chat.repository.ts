import { injectable } from 'inversify';
import { Types } from 'mongoose';
import Chat from '../model/chats.model';



@injectable()
export class ChatRepository{
	///Create
	async create(payload: any) {
		const chatModel = new Chat(payload);
		return await chatModel.save();
	}
	
	///Update
	async update(_id: Types.ObjectId, payload: any) {
		return await Chat.updateOne({ _id }, {
			$set: { ...payload }
		});
	}
	
}