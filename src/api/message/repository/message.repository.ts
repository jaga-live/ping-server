import { injectable } from 'inversify';
import Message from '../model/message.model';


@injectable()
export class MessageRepository{
	async create(payload: any) {
		const messageModel = new Message(payload);
		return await messageModel.save();
	}
}