import { model, Schema, Types } from 'mongoose';


export interface IMessage{
    chatId: string
    message: string
    type: string
}


const MessageSchema = new Schema({
	chatId: {
		type: Types.ObjectId,
		ref: 'chats'
	},
	message: String,
	type: String
});

export default model<IMessage>('message', MessageSchema);