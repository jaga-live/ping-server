import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
	name: string,
	email: string,
	user_name: string,
	password: string,
	role: string,
}

const UserSchema: Schema = new Schema({
	name: String,
	email: String,
	user_name: String,
	password: String,
	role: String,
});


export default model<IUser>('users', UserSchema);