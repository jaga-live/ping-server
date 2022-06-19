import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { UserService } from "./users.service";

@controller('/user')
export class UserController{
    constructor( 
         @inject(UserService) private readonly userService: UserService
     ) { }
    
    
    /////Create User
    @httpPost('')
    async addUser() {
        ///Todo
    }


    ////View All Users
    @httpGet('')
    async viewUsers(): Promise<any> {
        return this.userService.getUsers()
    }

}