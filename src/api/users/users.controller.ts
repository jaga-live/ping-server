import { NextFunction } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, next } from "inversify-express-utils";
import { UserService } from "./users.service";
@controller('/user')
export class UserController{
    constructor( @inject(UserService) private readonly userService: UserService ) {}
    
    /////Create User
    @httpPost('')
    async addUser() {
        ///Todo
    }

    ////View All Users
    @httpGet('')
    async viewUsers(
        @next() next: NextFunction
    ): Promise<any> {
        
        return this.userService.getUsers()
    }

}