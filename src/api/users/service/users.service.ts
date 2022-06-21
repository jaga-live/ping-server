import { inject, injectable } from "inversify";
import { IUser } from "../model/user.model";
import { UserRepository } from "../repository/users.repository";
import { CreateUserDto } from "../_dto/users.dto";

@injectable()
export class UserService{
    constructor(
        @inject(UserRepository) private readonly userRepository: UserRepository
    ) { }
    

    //////Create new User
    async createUser(payload: IUser): Promise<IUser[]> {
        const userData = CreateUserDto.create(payload)
        const { userName, email } = userData

        //////Find Existing User
        let isEmailUnique = await this.userRepository.findByEmail(email)
        if (isEmailUnique) throw new Error('Email already exists')
        
        //////Find Existing User
        let isUsernameUnique = await this.userRepository.findByUsername(userName)
        if (isUsernameUnique) throw new Error('Username already exists')

        const saveUser = await this.userRepository.create(payload)
        return saveUser

    }


    //////View All Users
    async getUsers() {
        // throw new Error()
        return this.userRepository.get()
    }

}

