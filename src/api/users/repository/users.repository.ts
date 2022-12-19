import { injectable } from 'inversify';
import { Types } from 'mongoose';
import User, { IUser } from '../model/users.model';
import { UserDto } from '../_dto/users.dto';


@injectable()
export class UserRepository{
	constructor() { }
    
	/////CREATE
	async create_user(payload: any): Promise<IUser> {
		// const createUser: any = await User.insertMany(payload);
		const createUser: any = new User(payload);
		let create = await createUser.save();
		create = create.toObject();
		return create;
        
	}

	/////GET
	////Find User by id
	async find_by_id(_id: Types.ObjectId) {
		const user = await User.findOne({ _id });
		return user;
	}
	////Find User by Email
	async find_by_email(email: string) {
		const user = await User.findOne({ email });
		return user;
	}

	async find_by_user_name(user_name: string, user_tag: string) {
		const user = await User.findOne({
			$and: [
				{ user_name },
				{ user_tag }
			] 
		});
		return user;
	}

	/////PATCH
	async custom_update(query: any) {
		////TODO
	}
}