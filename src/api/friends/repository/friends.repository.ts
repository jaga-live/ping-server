import { injectable } from 'inversify';
import { Types } from 'mongoose';
import Friend from '../model/friend.model';
import { CreateFriendDto } from '../_dto/friends.dto';

@injectable()
export class FriendRepository{
///Create
	async create(payload: any) {
		const createFriend = await new Friend(payload);
		createFriend.save();
		return createFriend;
	}

	///View
	async findRequestByfriends(users: Types.ObjectId[]) {
		const friendRequest = await Friend.findOne({
			users: { $in: users }
		});

		return friendRequest;
	}

	///Update
	async update(requestId: Types.ObjectId, expression: any) {
		await Friend.updateOne({ _id: requestId }, {
			...expression
		});
	}

}