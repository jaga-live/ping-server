import { model, Schema } from 'mongoose';


export const UserSchema = new Schema({
	name: String,
	email: String,
	userName: String,
	password: String,
	session: [String],
	_2fa: {
		type: Object,
		default: null
	}
});

export const User = model('users', UserSchema);