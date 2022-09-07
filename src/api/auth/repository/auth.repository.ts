import { injectable } from 'inversify';
import { Types } from 'mongoose';
import Auth from '../model/auth.model';

@injectable()
export class AuthRepository{

	async create(payload: any) {
		const authPayload = new Auth(payload);
		authPayload.save();
	}

	async find(userId: Types.ObjectId) {
		const auth = await Auth.findOne({ userId });
		return auth;
	}

	async update(_id: Types.ObjectId, expression: any) {
		await Auth.updateOne({ _id }, { ...expression });
	}
}