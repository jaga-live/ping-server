import { inject } from 'inversify';
import { controller, httpGet, httpPost, TYPE } from 'inversify-express-utils';
import { Types } from 'mongoose';
import { TYPES } from '../../../core/inversify/types';
import { IMailService } from '../../../shared/mail/mail.service';
import { AuthGuard } from '../../auth/middleware/auth.middleware';
import { AuthRepository } from '../../auth/repository/auth.repository';
import { IUserService } from '../service/users.service';
import { CreateUserDto } from '../_dto/users.dto';

@controller('/user')
export class UserController{
	constructor(
		@inject(TYPES.UserService) private readonly userService: IUserService
	) { }
    
    @httpPost('/signup')
	async signup(req: any) {

		/////Validate
		const payload = await CreateUserDto.validate(req.body);
    
		////Create User
		const createUser = await this.userService.signupUser(payload);
		return createUser;
	}

    @httpGet('/profile', AuthGuard)
    async get() {
    	return 'Hello';
    }


}