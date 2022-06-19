import { inject, injectable } from "inversify"
import userModel from "./model/user.model"

@injectable()
export class UserRepository {

    async get(){
        var data = await userModel.find({})
        data
        return data
    }
}

