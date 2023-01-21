import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { HttpException } from '../../../core/exception';
import { UserRepository } from '../../users/repository/users.repository';
import FriendRequest from '../model/friend_request.model';
import { FriendRepository } from '../repository/friends.repository';
import { FriendRequestRepository } from '../repository/friend_request.repository';
import { CreateFriendDto, FriendRequestActions } from '../_dto/friends.dto';

export interface IFriendService{
	send_request(userId: string, friendId: string): Promise<any>,
	accept_or_reject(userId: Types.ObjectId, requestId: Types.ObjectId, action: string),
	view_friends(userId: Types.ObjectId),
	remove_friend(userId: Types.ObjectId, friendId: Types.ObjectId)
}

@injectable()
export class FriendService implements IFriendService{
	constructor(
        @inject(FriendRepository) private readonly friendRepo: FriendRepository,
        @inject(FriendRequestRepository) private readonly friendRequestRepo: FriendRequestRepository,
        @inject(UserRepository) private readonly userRepo: UserRepository,
	) { }
    
	///Send Friend Request
	async send_request(userId: string, friendId: string): Promise<any> {

		///Check if user valid
		const isFriendValid = await this.userRepo.find_by_id(new Types.ObjectId(userId));
		if (!isFriendValid) throw new HttpException('User Not Found', 400);

		///Check if users already friends
		const alreadyFriends = await this.friendRepo.findRequestByfriends([
			new Types.ObjectId(userId),
			new Types.ObjectId(friendId)
		]);
		if (alreadyFriends) throw new HttpException('Already Friends', 400);
        
		const checkRequest = await this.friendRequestRepo.find_by_sender(new Types.ObjectId(userId));
		if (checkRequest) throw new HttpException('Friend Request Already Sent', 400);

		const createUser = await this.friendRequestRepo.create(
			new Types.ObjectId(userId),
			new Types.ObjectId(friendId)
		);
		return createUser;
	}

	///View all friend Incoming or Outgoing Friend Requests
	async view_friend_request(userId: string, requestType: string) {
		let matchQuery = {};

		if (!['incoming', 'outgoing'].includes(requestType)) throw new HttpException('Invalid Friend Request Type!', 400);
		if (requestType === 'incoming') matchQuery = {
			receiver: new Types.ObjectId(userId)
		};
		if (requestType === 'outgoing') matchQuery = {
			sender: new Types.ObjectId(userId)
		};

		const friend_request = await FriendRequest.aggregate([
			{
				$match: {
					...matchQuery,
					status: 'pending'
				},
			},
			{
				$addFields: {
					friendId: requestType === 'incoming'? '$sender': '$receiver'
				}
			},
			{
				$lookup: {
					from: 'users',
					localField: 'friendId',
					foreignField: '_id',
					as: 'friendInfo'
				}
			},
			{
				$unwind: '$friendInfo'
			}
			
		]);

		return friend_request;

	}

	///Accept or Reject Friend Request
	async accept_or_reject(userId: Types.ObjectId, requestId: Types.ObjectId, action: string) {
		///Validate Actions
		if (!FriendRequestActions.includes(action)) throw new HttpException('Invalid Actions', 400);
        
		///Validate user
		const isUser = await this.userRepo.find_by_id(new Types.ObjectId(userId));
		if (!isUser) throw new HttpException('User Not Found', 400);

		///Validate friend request
		const isRequestValid = await this.friendRequestRepo.find_by_id(new Types.ObjectId(requestId));
		if (!isRequestValid || isRequestValid?.status !== 'pending') throw new HttpException('Cannot process request', 400);
		
		const expression = {
			status: action === 'accept' ? 'accepted' : 'rejected'
		};

		///Update status in request
		await this.friendRequestRepo.update(requestId, expression);

		// ///Create new Relationship
		return await this.friendRepo.create(
			[
				new Types.ObjectId(userId),
				new Types.ObjectId(isRequestValid.sender),
			]
		);
        
	}

	///View Friend Request
	async view_friends(userId: Types.ObjectId) {
		const friends = await this.friendRepo.findAll(userId);
		return friends;
	}

	///Remove Friend
	async remove_friend(userId: Types.ObjectId, friendId: Types.ObjectId) {
		const users: Types.ObjectId[] = [userId, friendId];

		///Remove Friend
		await this.friendRepo.delete({
			users: { $in: users }
		});

		///Remove related friend requests
		await this.friendRequestRepo.delete({
			$or: [
				{ sender: userId, receiver: friendId },
				{ sender: friendId, receiver: userId }
			]
		});
	}
}