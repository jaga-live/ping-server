import { Document, model, Schema, Types } from 'mongoose';


export interface IFriend extends Document{
	users: Types.ObjectId[],
	createdAt: Date,
	isBlocked: Boolean
}

const FriendSchema = new Schema({
	users: [Types.ObjectId],
	createdAt: {
		type: Date,
		default: new Date()
	},
	isBlocked: {
		type: Boolean,
		default: false
	}
});

export default model<IFriend>('friends', FriendSchema);