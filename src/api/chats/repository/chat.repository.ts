import { injectable } from 'inversify';
import Chat from '../model/chats.model';



@injectable()
export class ChatRepository{
	async create(payload: any) {
		const chatModel = new Chat(payload);
		return await chatModel.save();
	}
}