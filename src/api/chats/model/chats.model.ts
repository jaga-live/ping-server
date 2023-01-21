import { model, Schema, Types } from 'mongoose';


interface IChat{
    chatType: string
    users: Types.ObjectId[]
    pfp: string
}

const ChatSchema = new Schema({
	chatType: String,
	users: {
		type: [Types.ObjectId],
		ref: 'users'
	},
	pfp: String
});

export default model<IChat>('chats', ChatSchema);