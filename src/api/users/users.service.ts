import { inject, injectable } from "inversify";
import { IUser } from "./model/user.model";
import { UserRepository } from "./users.repository";

@injectable()
export class UserService{
    constructor(
        @inject(UserRepository) private readonly userRepository: UserRepository
    ) { }
    

    //////Create new User
    async createUser(payload: IUser) {
        ////Todo
    }


    //////View All Users
    async getUsers() {
        // throw new Error()
        return this.userRepository.get()
    }

}

