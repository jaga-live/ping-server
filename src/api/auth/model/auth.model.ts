import { model, Schema, Types, Document } from 'mongoose';

interface TwoFactorAuth {
	signature: string,
	otp: string
}

export interface IAuth extends Document{
    userId: string,
    jwtSession: [string]
    _2fa: TwoFactorAuth
}

const AuthSchema: Schema = new Schema({
	userId: {
		type: Types.ObjectId,
		ref: 'users'
	},
	jwtSession: [String],
	_2fa: {
		type: Object,
		default: {
			signature: null,
			otp: null
		}
	}
});

export default model<IAuth>('auth', AuthSchema);
