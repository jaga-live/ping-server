import { injectable } from 'inversify';
import { Types } from 'mongoose';
import Friend from '../model/friend.model';

@injectable()
export class FriendRepository{
///Create
	async create(users: Types.ObjectId[]) {
		const createFriend = await new Friend({users});
		createFriend.save();
		return createFriend;
	}

	///View
	async findAll(userId: Types.ObjectId) {
		const friends = await Friend.aggregate([
			{
				$match: {
					users: userId
				}
			},
			{
				$unwind: '$users'
			},
			{
				$match: {
					users: {
						$ne: userId
					}
				}
			},
			{
				$lookup: {
					from: 'users',
					localField: 'users',
					foreignField: '_id',
					as: 'user'
				}
			},
			{
				$unwind: '$user'
			},
			{
				$replaceRoot: {
					newRoot: '$user'
				}
			}
		]);
		return friends;
	}
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