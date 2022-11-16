import { inject } from 'inversify';
import { controller, httpGet, httpPost, request, requestBody, TYPE } from 'inversify-express-utils';
import { Types } from 'mongoose';
import { TYPES } from '../../../core/inversify/types';
import { Req } from '../../../core/types/custom.types';
import { AuthGuard } from '../../auth/middleware/auth.middleware';
import { IUserService } from '../service/users.service';
import { CreateUserDto, UserDto } from '../_dto/users.dto';

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
    async get(@request() req: Req) {
    	const { userId } = req.userData;

    	const user = await this.userService.profile(new Types.ObjectId(userId)) as UserDto;
    	return UserDto.create(user);
    }


}