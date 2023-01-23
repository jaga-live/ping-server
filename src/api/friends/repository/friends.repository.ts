import { injectable } from 'inversify';
import { Types } from 'mongoose';
import Friend from '../model/friend.model';

export interface IFriendRepository{
	create(users: Types.ObjectId[])
	findAll(userId: Types.ObjectId)
	findRequestByfriends(users: Types.ObjectId[])
	update(requestId: Types.ObjectId, expression: any),
	delete(expression: any),
}
@injectable()
export class FriendRepository implements IFriendRepository{
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
					as: 'friend'
				}
			},
			{
				$unwind: '$friend'
			},
			{
				$replaceRoot: {
					newRoot: '$friend'
				}
			}, { $sort: { name: 1 } }
		]);
		return friends;
	}
	async findRequestByfriends(users: Types.ObjectId[]) {
		const friendRequest = await Friend.findOne({
			users: {$all: users }
		});

		return friendRequest;
	}

	///Update
	async update(requestId: Types.ObjectId, expression: any) {
		await Friend.updateOne({ _id: requestId }, {
			...expression
		});
	}

	///Delete
	async delete(expression: any) {
		await Friend.deleteOne({ ...expression });
	}

}