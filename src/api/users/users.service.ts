import { inject, injectable } from "inversify";
import { User } from "./model/user.model";
import { UserRepository } from "./users.repository";

@injectable()
export class UserService{
    constructor(
        @inject(UserRepository) private readonly userRepository: UserRepository
    ) { }
    

    //////Create new User
    async createUser(payload: User) {
        ////Todo
    }


    //////View All Users
    async getUsers() {
        return this.userRepository.get()
    }

}

