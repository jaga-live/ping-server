import { injectable } from "inversify";
import { User } from "../model/users.model";


@injectable()
export class UserRepository{
    constructor() { }
    

    async create_user(payload: any) {
        await User.insertMany(payload)
        
    }

    ////Find User by Email
    async find_by_email(email: string) {
        let user = await User.findOne({ email })
        return user
    }

    async find_by_userName(userName: string) {
        let user = await User.findOne({ userName })
        return user
    }
}