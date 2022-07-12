import { inject, injectable } from "inversify";
import { UserRepository } from "../repository/users.repository";
import { HttpException } from '../../../core/exception'

export interface IUserService{
    signupUser(payload: any): Promise<string>
}
@injectable()
export class UserService implements IUserService{
    constructor(
        @inject(UserRepository) private readonly User: UserRepository
    ) { }
    
    async signupUser(payload: any): Promise<string> {
        const { email, userName } = payload
        
        /////Validate Email
        let validateEmail = await this.User.find_by_email(email)
        if (validateEmail) throw new HttpException('Email already exists', 409)

        /////Validate Username
        let validateUsername = await this.User.find_by_userName(userName)
        if (validateUsername) throw new HttpException('Username already exists', 409)
        
        await this.User.create_user(payload)
        return payload
    }

    
}