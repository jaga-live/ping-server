import { Document, model, Schema, Types } from 'mongoose';


export interface IBlockedUsers extends Document{
	users: Types.ObjectId,
	createdAt: Date,
    blockedBy: string[]
}

const FriendSchema = new Schema({
	users: Types.ObjectId,
	createdAt: Date,
	blockedBy: [String]
});

export default model<IBlockedUsers>('blocked_users', FriendSchema);