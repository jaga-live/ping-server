import { inject, injectable } from 'inversify';
import { UserRepository } from '../repository/users.repository';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify/types';
import { IMailService } from '../../../shared/mail/mail.service';
import { IUser } from '../model/users.model';
import { AuthRepository } from '../../auth/repository/auth.repository';
import { Types } from 'mongoose';

export interface IUserService{
    signupUser(payload: any): Promise<IUser>,
    profile(userId: Types.ObjectId): Promise<IUser>,
}
@injectable()
export class UserService implements IUserService{
	constructor(
		@inject(UserRepository) private readonly UserRepo: UserRepository,
		@inject(AuthRepository) private readonly AuthRepo: AuthRepository,
        @inject(TYPES.MailService) private readonly mailService: IMailService
	) { }
    
	/////Signup User
	async signupUser(payload: any): Promise<any> {
		const { email, user_name, user_tag } = payload;
		/////Validate Email
		const validateEmail = await this.UserRepo.find_by_email(email);
		if (validateEmail) throw new HttpException('Email already exists', 409);

		/////Validate user_name duplication
		const validate_user_name_duplication = await this.UserRepo.find_by_user_name(user_name, user_tag);
		if (validate_user_name_duplication) throw new HttpException('user_name already exists', 409);

		///Validate Username
		const validate_user_name = this.validateUsername(user_name, user_tag);
		if(!validate_user_name.status) throw new HttpException('Invalid Username', 400);
        
		///Persist user data
		const createUser = await this.UserRepo.create_user(payload);

		///Create Auth for User
		await this.AuthRepo.create({
			userId: new Types.ObjectId(createUser._id)
		});

		const mailConfig = {
			to: payload.email,
			type: 'welcomeMail',
			context: { receiverName: payload.name }
		};
		await this.mailService.sendMail(mailConfig);

		return {
			...createUser,
			user_name: validate_user_name.user_name,
			tag: validate_user_name.user_tag
		};
	}

	 validateUsername(user_name: string, user_tag: string): any {

		 //Name Validation
		 if (!(user_name.length >= 3 && user_name.length <= 10)) return { status: false };
		 
		 //Tag validation
		 if (!(user_tag.length >= 3 && user_tag.length <= 5)) return { status: false };
		 
		 return {
			 status: true,
			 user_name,
			 user_tag
		 };
	}

	///Find Single User
	async profile(userId: Types.ObjectId): Promise<IUser> {
		const user = await this.UserRepo.find_by_id(userId);
		return user;
	}

    
}