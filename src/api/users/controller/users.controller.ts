import { NextFunction, Request } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, next, TYPE } from "inversify-express-utils";
import { TYPES } from "../../../core/types";
import { MailService } from "../../mail/mail";
import { UserService } from "../service/users.service";

@controller('/user')
export class UserController{
    constructor(
        @inject(TYPES.UserService) private readonly userService: UserService,
        @inject(TYPES.UserService) private readonly mail: MailService,
    ) { }
    
    /////Create User
    @httpPost('')
    async addUser(req: Request) {

        // let saveData = await this.userService.createUser(req.body)
        ///Initiate Mail
       this.mail.handle()
        // return User.create(saveData[0])
    }

    ////View All Users
    @httpGet('', TYPES.AuthGuard)
    async viewUsers(
        @next() next: NextFunction
    ): Promise<any> {
        
        return this.userService.getUsers()
    }

}