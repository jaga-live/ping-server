import { inject, injectable } from "inversify"
import { MongooseService } from "../../database/mongo"

@injectable()
export class UserRepository {

    // constructor( private readonly db: MongooseService){}
    constructor( @inject(MongooseService) private readonly db: MongooseService){}
    async get() {
        var data = await this.db.users.countDocuments({})
        return {data}
    }
}

