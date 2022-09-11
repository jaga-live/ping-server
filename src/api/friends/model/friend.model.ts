import { Document, model, Schema, Types } from 'mongoose';


export interface IFriend extends Document{
    users: Types.ObjectId[],
    status: string,
    blockedBy: string[]
}

const FriendSchema = new Schema({
	users: [Types.ObjectId],
	status: {
		type: String,
		default: 'pending'
	},
	blockedBy: [String]
});

export default model<IFriend>('friends', FriendSchema);