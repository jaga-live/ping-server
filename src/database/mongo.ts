import { connect } from "mongoose";
import 'dotenv/config'


const URI:any = process.env.MONGO_URI

connect(URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(()=> console.log('Unable to connect to MongoDB'))