import { Document, model, Schema, Types } from 'mongoose';


export interface IFriend extends Document{
	users: Types.ObjectId[],
	createdAt: Date,
    blockedBy: string[]
}

const FriendSchema = new Schema({
	users: [Types.ObjectId],
	createdAt: Date,
	blockedBy: [String]
});

export default model<IFriend>('friends', FriendSchema);