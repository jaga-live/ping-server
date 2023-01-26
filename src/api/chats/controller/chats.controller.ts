import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Types } from 'mongoose';
import { TYPES } from '../../../core/inversify/types';
import { Req } from '../../../core/types/custom.types';
import { AuthGuard } from '../../auth/middleware/auth.middleware';
import { ChatService } from '../service/chat.service';


@controller('/chats')
export class ChatController{
	constructor(
        @inject(TYPES.ChatService) private readonly chatService: ChatService
	) { }

	///New Group Chat
	@httpPost('/', AuthGuard)
	async newChat(req: Req) {
		const { userId } = req.userData;
		return await this.chatService.create_group_chat(new Types.ObjectId(userId), req.body);
	}
    
    @httpGet('/', AuthGuard)
	async getAllChats(req: Req) {
		const {userId} = req.userData;
		return await this.chatService.get_all_chats(new Types.ObjectId(userId));
	}
}