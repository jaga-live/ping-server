import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Types } from 'mongoose';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify/types';
import { Req } from '../../../core/types/custom.types';
import { AuthGuard } from '../../auth/middleware/auth.middleware';
import { MessageService } from '../../message/service/message.service';
import { ChatService } from '../service/chat.service';


@controller('/chats')
export class ChatController{
	constructor(
        @inject(TYPES.ChatService) private readonly chatService: ChatService,
        @inject(TYPES.MessageService) private readonly messageService: MessageService,
	) { }

	///New Group Chat
	@httpPost('/', AuthGuard)
	async newChat(req: Req) {
		const { userId } = req.userData;
		return await this.chatService.create_group_chat(new Types.ObjectId(userId), req.body);
	}
    
	///Get All Chats
    @httpGet('/', AuthGuard)
	async getAllChats(req: Req) {
		const {userId} = req.userData;
		return await this.chatService.get_all_chats(new Types.ObjectId(userId));
	}

	/////////Messages///////
	@httpGet('/:chatId/messages', AuthGuard)
	async getChatMessage(req: Req) {
		let chatId: any = req.params.chatId
		let userId: any = req.userData.userId
		const { ObjectId } = Types

		if (!ObjectId.isValid(chatId) || !ObjectId.isValid(userId)) throw new HttpException('Invalid Params', 400)
		
		chatId = new ObjectId(chatId)
		userId = new ObjectId(userId)

		return await this.messageService.get_message_by_chatId(chatId, userId, req.query)
	}
}