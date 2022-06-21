import { NextFunction, Request } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, next } from "inversify-express-utils";
import { IUser } from "../model/user.model";
import { UserService } from "../service/users.service";
import { CreateUserDto, User } from "../_dto/users.dto";

@controller('/user')
export class UserController{
    constructor( @inject(UserService) private readonly userService: UserService ) {}
    
    /////Create User
    @httpPost('')
    async addUser(req: Request) {
        const payload = CreateUserDto.create(req.body)
        
        let saveData = await this.userService.createUser(req.body)
        return User.create(saveData[0])
    }

    ////View All Users
    @httpGet('')
    async viewUsers(
        @next() next: NextFunction
    ): Promise<any> {
        
        return this.userService.getUsers()
    }

}