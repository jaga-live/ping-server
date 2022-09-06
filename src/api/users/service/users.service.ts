import { inject, injectable } from 'inversify';
import { UserRepository } from '../repository/users.repository';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify/types';
import { IMailService } from '../../../shared/mail/mail.service';
import { IUser } from '../model/users.model';
import { AuthRepository } from '../../auth/repository/auth.repository';
import { Types } from 'mongoose';

export interface IUserService{
    signupUser(payload: any): Promise<IUser>
}
@injectable()
export class UserService implements IUserService{
	constructor(
		@inject(UserRepository) private readonly UserRepo: UserRepository,
		@inject(AuthRepository) private readonly AuthRepo: AuthRepository,
        @inject(TYPES.MailService) private readonly mailService: IMailService
	) { }
    
	/////Signup User
	async signupUser(payload: any): Promise<IUser> {
		const { email, user_name } = payload;
        
		/////Validate Email
		const validateEmail = await this.UserRepo.find_by_email(email);
		if (validateEmail) throw new HttpException('Email already exists', 409);

		/////Validate user_name
		const validate_user_name = await this.UserRepo.find_by_user_name(user_name);
		if (validate_user_name) throw new HttpException('user_name already exists', 409);
        
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

		return createUser;
	}

    
}