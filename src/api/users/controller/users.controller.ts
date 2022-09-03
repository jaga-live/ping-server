import { inject } from 'inversify';
import { controller, httpGet, httpPost, TYPE } from 'inversify-express-utils';
import { TYPES } from '../../../core/inversify/types';
import { IMailService } from '../../../shared/mail/mail.service';
import { IUserService } from '../service/users.service';
import { CreateUserDto } from '../_dto/users.dto';

@controller('/user')
export class UserController{
	constructor(
        @inject(TYPES.UserService) private readonly userService: IUserService,
        @inject(TYPES.MailService) private readonly mailService: IMailService
	) { }
    
    @httpPost('/signup')
	async signup(req: any) {

		/////Save User
		const payload = await CreateUserDto.validate(req.body);
        
		/////Send Welcome Mail
		const mailConfig = {
			to: payload.email,
			type: 'welcomeMail',
			context: { receiverName: payload.name }
		};
        
		const userData = await this.userService.signupUser(payload);
        
		await this.mailService.sendMail(mailConfig);
		return userData;
	}

    @httpGet('')
    async get() {
    	return 'Hello';
    }


}