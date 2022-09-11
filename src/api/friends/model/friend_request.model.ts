import { string } from 'joi';
import { model, Schema, Types } from 'mongoose';

export interface IFriendRequest{
    sender: string,
    receiver: string,
    createdAt: Date,
    status: string
}

const FriendRequestSchema = new Schema({
	sender: Types.ObjectId,
	receiver: Types.ObjectId,
	createdAt: Date,
	status: {
		type: String,
		default: 'pending'
	}
});

export default model<IFriendRequest>('friend_request', FriendRequestSchema);