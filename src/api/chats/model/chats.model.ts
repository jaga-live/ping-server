import { model, Schema, Types } from 'mongoose';


interface IChat{
    type: string
    users: Types.ObjectId[]
    pfp: string
}

const ChatSchema = new Schema({
	type: String,
	users: {
		type: [Types.ObjectId],
		ref: 'users'
	},
	pfp: String
});

export default model<IChat>('chats', ChatSchema);