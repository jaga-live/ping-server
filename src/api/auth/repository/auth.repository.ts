import { injectable } from 'inversify';
import Auth from '../model/auth.model';

@injectable()
export class AuthRepository{

	async create(payload: any) {
		const authPayload = new Auth(payload);
		authPayload.save();
	}
}