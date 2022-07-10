import { inject } from "inversify";
import { controller, httpGet, httpPost, TYPE } from "inversify-express-utils";
import { TYPES } from "../../../core/inversify/types";
import { IMailService } from "../../../shared/mail/mail.service";
import { IUserService } from "../service/users.service";

@controller('/user')
export class UserController{
    constructor(
        @inject(TYPES.UserService) private readonly userService: IUserService,
        @inject(TYPES.MailService) private readonly mailService: IMailService
    ) { }
    
    @httpPost('/signup')
    async signup(req: any) {
        return this.userService.signupUser(req.body)
    }

    @httpGet('/1')
    async get1() {
        return this.mailService.getMail()
    }

}