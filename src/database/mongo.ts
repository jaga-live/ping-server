import { connect } from "mongoose";
import { injectable } from "inversify";
import 'dotenv/config'
const URI:any = process.env.MONGO_URI

@injectable()
export class MongooseService{

    async connect() {
        await connect(URI)
        .then(() => console.log('MongoDB Connected'))
        .catch(()=> console.log('Unable to connect to MongoDB'))
    }

}