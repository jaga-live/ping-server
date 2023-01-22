import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { Types } from "mongoose";
import { TYPES } from "../../../core/inversify/types";
import { Req } from "../../../core/types/custom.types";
import { AuthGuard } from "../../auth/middleware/auth.middleware";
import { ChatService } from "../service/chat.service";


@controller('/chats')
export class ChatController{
    constructor(
        @inject(TYPES.ChatService) private readonly chatService: ChatService
    ) { }
    
    @httpGet('/', AuthGuard)
    async getAllChats(req: Req) {
        const {userId} = req.userData
        return await this.chatService.get_all_chats(new Types.ObjectId(userId))
    }
}