import { model, Schema, Types } from 'mongoose';


interface IChat{
    chatType: string
    users: Types.ObjectId[]
	pfp: string,
	createdBy: string,
	modifiedAt: Date
}

const ChatSchema = new Schema({
	chatType: String,
	users: {
		type: [Types.ObjectId],
		ref: 'users'
	},
	pfp: String,
	createdBy: {
		type: Types.ObjectId,
		default: null
	},
	modifiedAt: {
		type: Date,
		default: new Date()
	}
});

export default model<IChat>('chats', ChatSchema);