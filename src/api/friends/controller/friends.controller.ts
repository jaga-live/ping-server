import { inject } from 'inversify';
import { controller, httpPatch, httpPost, request, requestBody, requestParam } from 'inversify-express-utils';
import { Types } from 'mongoose';
import { TYPES } from '../../../core/inversify/types';
import { Req } from '../../../core/types/custom.types';
import { AuthGuard } from '../../auth/middleware/auth.middleware';
import { FriendService } from '../service/friend.service';


@controller('/friend')
export class FriendController{
	constructor(
        @inject(TYPES.FriendService) private readonly friendService: FriendService
	) { }
    
    //Send Friend Request
    @httpPost('/request', AuthGuard)
	async sendRequest(
        @requestBody() payload: any,
        @request() req: Req
	) {
		await this.friendService.send_request(payload.friendId, req.userData.userId);
		return {
			message: 'Friend Request Sent'
		};
	}

    //Accept or Reject Request
    @httpPatch('/request/:requestId/:action', AuthGuard)
    async acceptOrReject(
        @requestParam('requestId') requestId: string,
        @requestParam('action') action: string,
        @request() req: Req
    ) {
    	const { userId } = req.userData;
    	await this.friendService.accept_or_reject(
    		new Types.ObjectId(userId),
    		new Types.ObjectId(requestId),
    		action
    	);

    	return {
    		message: 'Ok'
    	};
    }
}