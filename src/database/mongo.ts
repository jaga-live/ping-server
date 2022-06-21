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
      
    try {
      await mongoose.connect(URI)
          .then(res => {
              this._db = res
      })

      console.log('Connected to MongoDB Atlas')
      
    } catch (error) {
      console.log('Unable to connect to MongoDB Atlas', error)
    }
  }

    get users() {
    return this._db.model('users', UserSchema)
  }

}