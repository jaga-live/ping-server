import { injectable } from 'inversify';
import User, { IUser } from '../model/users.model';
import { UserDto } from '../_dto/users.dto';


@injectable()
export class UserRepository{
	constructor() { }
    
	/////CREATE
	async create_user(payload: any): Promise<IUser> {
		const createUser: any = await User.insertMany(payload);
		return createUser;
        
	}

	/////GET
	////Find User by Email
	async find_by_email(email: string) {
		const user = await User.findOne({ email });
		return user;
	}

	async find_by_user_name(user_name: string) {
		const user = await User.findOne({ user_name });
		return user;
	}

	/////PATCH
	async custom_update(query: any) {
		////TODO
	}
}