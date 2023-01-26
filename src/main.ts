import 'reflect-metadata';
import './core/app';
import './database/redis';
import { Mongoose } from './database/mongoose';
import {listen} from './events/sockets/index';

async function bootstrap() {
	///Connect to MongoDB Atlas
	new Mongoose().connect();

	//Initiate Sockets Handler
	await listen();
}



bootstrap();