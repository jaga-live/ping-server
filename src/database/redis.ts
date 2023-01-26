import { Redis } from 'ioredis';

const client = new Redis({
	host: '154.61.74.196',
	port: 6379,
	password: process.env.REDIS_PASS,
	db: 0,
});

client.on('connect', () => {
	console.log('Redis connection established.');
});

client.on('error', (err) => {
	console.log('Error connecting to Redis: ' + err);
});

export default client;