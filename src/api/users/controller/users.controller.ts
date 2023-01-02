import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, request, requestBody, TYPE } from 'inversify-express-utils';
import { Types } from 'mongoose';
import { TYPES } from '../../../core/inversify/types';
import { Req } from '../../../core/types/custom.types';
import { InternalAuthGuard } from '../../auth/guards/internal_auth.guard';
import { AuthGuard } from '../../auth/middleware/auth.middleware';
import { IUserService } from '../service/users.service';
import { CreateUserDto, UserDto } from '../_dto/users.dto';

@controller('/user')
export class UserController{
	constructor(
		@inject(TYPES.UserService) private readonly userService: IUserService
	) { }
    
	///User Signup
    @httpPost('/signup', InternalAuthGuard)
	async signup(req: any) {
		/////Validate
		const payload = await CreateUserDto.validate(req.body);

		////Create User
		const createUser = await this.userService.signupUser(payload);
		return createUser;
	}

    ///User Profile
    @httpGet('/profile', AuthGuard)
    async get(@request() req: Req) {
    	const { userId } = req.userData;

    	const user = await this.userService.profile(new Types.ObjectId(userId)) as UserDto;
    	return UserDto.create(user);
    }
	
	///Search User
	@httpPost('/search')
    async search(req: Req) {
    	const { user_name, user_tag } = req.body;
    	return await this.userService.find_by_user_name(user_name, user_tag);

    }


}