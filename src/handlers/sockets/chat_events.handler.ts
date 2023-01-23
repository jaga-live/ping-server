import { inject, injectable } from 'inversify';
import { ChatRepository } from '../../api/chats/repository/chat.repository';
import { MessageRepository } from '../../api/message/repository/message.repository';


@injectable()
export class ChatEventsHandler{
	constructor(
        @inject(MessageRepository) private readonly messageRepo: MessageRepository,
        @inject(ChatRepository) private readonly chatRepo: ChatRepository,
	) { }
	
	async handle(userData: any, payload: any) {
		const { _id, messageType, message } = payload;
		const userId = userData.apps.ping.userId;

		const messagePayload = {
			chatId: _id,
			type: messageType,
			message: message,
			sender: userId 
		};

		///Save Message
		await this.messageRepo.create(messagePayload);

		///Update Chat
		await this.chatRepo.update(_id, { modifiedAt: new Date() });
	}
}