import { connect } from 'mongoose';
import 'dotenv/config';

const URI: any = process.env.MONGO_URI;

export class Mongoose{

	async connect() {
		connect(URI)
			.then(res => console.log('MongoDB Atlas Connected'))
			.catch(err=> console.log('Cannot connect to MongoDB Atlas'));
	}
}

