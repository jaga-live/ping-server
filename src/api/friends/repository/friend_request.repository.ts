import { injectable } from 'inversify';
import { Types } from 'mongoose';
import { IFriend } from '../model/friend.model';
import FriendRequest from '../model/friend_request.model';

@injectable()
export class FriendRequestRepository{

	async create(sender: Types.ObjectId, receiver: Types.ObjectId) {
		const friendRequest = await new FriendRequest({
			sender,
			receiver,
			createdAt: new Date()
		});

		return friendRequest.save();
	}

	///Find by if
	async find_by_id(_id: Types.ObjectId) {
		const friendRequest = await FriendRequest.findOne({ _id });
		return friendRequest;
	}

	///Find by Sender
	async find_by_sender(_id: Types.ObjectId): Promise<IFriend> {
		const friendRequest = await FriendRequest.findOne({
			sender: _id
		}) as IFriend;

		return friendRequest;
	}

	///Find by Sender
	async find_by_receiver(_id: Types.ObjectId): Promise<IFriend> {
		const friendRequest = await FriendRequest.findOne({
			sender: _id
		}) as IFriend;

		return friendRequest;
	}

	///Update Friend Request
	async update(requestId: Types.ObjectId, expression: any) {
		await FriendRequest.updateOne({ _id: requestId }, {
			...expression
		});
	}
}