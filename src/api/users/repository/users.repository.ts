import { injectable } from "inversify";
import { User } from "../model/users.model";


@injectable()
export class UserRepository{
    constructor() { }
    
/////CREATE
    async create_user(payload: any) {
        await User.insertMany(payload)
        
    }

/////GET
    ////Find User by Email
    async find_by_email(email: string) {
        let user = await User.findOne({ email })
        return user
    }

    async find_by_userName(userName: string) {
        let user = await User.findOne({ userName })
        return user
    }

/////PATCH
    async custom_update(query: any) {
        ////TODO
    }
}