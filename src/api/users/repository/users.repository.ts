import { inject, injectable } from "inversify"
import { MongooseService } from "../../../database/mongo"
import { IUser } from "../model/user.model"

@injectable()
export class UserRepository {
    constructor(@inject(MongooseService) private readonly db: MongooseService) { }
    


    async create(payload: any) {
        let saveData = await this.db.users.insertMany(payload)
        return saveData
    }

    /////Fetch all data from repository
    async get() {
        let data = await this.db.users.countDocuments({})
        return {data}
    }

    //////Find by userName
    async findByUsername(userName: string): Promise<IUser | null> {
        let userData: IUser = await this.db.users.findOne({ userName })
        return userData
    }


    //////Find by email
    async findByEmail(email: string): Promise<IUser | null> {
        let userData: IUser = await this.db.users.findOne({ email })
        return userData
    }
}

