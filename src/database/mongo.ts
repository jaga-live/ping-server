import mongoose from "mongoose";
import { injectable } from "inversify";
import 'dotenv/config'

import {UserModel, UserSchema} from '../api/users/model/user.model'

///Config
const URI:any = process.env.MONGO_URI

@injectable()
export class MongooseService{
    private _db: any

    async connect() {
        await mongoose.connect(URI)
            .then(res => {
                this._db = res
        })

    console.log('connected to DB')
  }

    get users() {
    return this._db.model('users', UserSchema)
  }

}