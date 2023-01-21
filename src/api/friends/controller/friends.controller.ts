import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, requestBody, requestParam } from 'inversify-express-utils';
import { Types } from 'mongoose';
import { TYPES } from '../../../core/inversify/types';
import { Req } from '../../../core/types/custom.types';
import { AuthGuard } from '../../auth/middleware/auth.middleware';
import { ChatRepository } from '../../chats/repository/chat.repository';
import { FriendService } from '../service/friend.service';


@controller('')
export class FriendController{
	constructor(
        @inject(TYPES.FriendService) private readonly friendService: FriendService,
        @inject(ChatRepository) private readonly chatRepo: ChatRepository,
	) { }
    
    ///Send Friend Request
    @httpPost('/friend/request', AuthGuard)
	async sendRequest(
        @requestBody() payload: any,
        @request() req: Req
	) {
		await this.friendService.send_request(req.userData.userId, payload.friendId);
		return {
			message: 'Friend Request Sent'
		};
	}

	///View Incoming and outgoing friend Request
	@httpGet('/friend/request/:requestType', AuthGuard)
    async viewRequest(req: Req) {
    	const { userId } = req.userData;
    	const { requestType } = req.params;

    	return await this.friendService.view_friend_request(userId, requestType);
    }

    ///Accept or Reject Request
    @httpPatch('/friend/request/:requestId/:action', AuthGuard)
	async acceptOrReject(
        @requestParam('requestId') requestId: string,
        @requestParam('action') action: string,
        @request() req: Req
	) {
    	const { userId } = req.userData;
    	const createFriends = await this.friendService.accept_or_reject(
    		new Types.ObjectId(userId),
    		new Types.ObjectId(requestId),
    		action
		);
		
		await this.chatRepo.create({
			chatType: 'DM',
			users: createFriends.users
		});

    	return {
    		message: 'Ok'
    	};
	}
	
	///Friend List
	@httpGet('/friends', AuthGuard)
    async view_friends(
		@request() req: Req
    ) {
    	const { userId } = req.userData;
    	return this.friendService.view_friends(new Types.ObjectId(userId));
    }
	
	///Remove Friend
	@httpDelete('/friend/:friendId', AuthGuard)
	async removeFriend(
		@requestParam('friendId') friendId: string,
		@request() req: Req
	) {
		const { userId } = req.userData;
		await this.friendService.remove_friend(
			new Types.ObjectId(userId),
			new Types.ObjectId(friendId)
		);
		return {
			message: 'Unfriended'
		};
	}
}