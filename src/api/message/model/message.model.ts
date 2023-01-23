import { model, Schema, Types } from 'mongoose';

export interface IMessage{
    chatId: string
    message: string
	type: string,
	sender: string,
	createdAt: Date,
	modifiedAt: Date
}


const MessageSchema = new Schema({
	chatId: {
		type: Types.ObjectId,
		ref: 'chats'
	},
	message: String,
	type: String,
	sender: String,
	createdAt: { type: Date, default: new Date() },
	modifiedAt: Date
});

///Index
MessageSchema.index({ message: 'text' });

export default model<IMessage>('message', MessageSchema);