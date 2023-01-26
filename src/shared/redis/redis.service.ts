import { injectable } from 'inversify';
import client from '../../database/redis';

@injectable()
export class RedisService{
	constructor() { }
    
	async sAdd(key: string, value: string) {
		client.sadd(key, value);
	}

	async smembers(key: string) {
		let values: any;
		await client.smembers(key, (err, sockets) => {
			if (err) return [];
			values = sockets;
		});
		return values;
	}

	async srem(key: string, value: string) {
		client.srem(key, value);
	}

	///Find and create array for a list of given set keys
	async fetchMultipleSets(keys: string[]) {
		const values = [];

		for (let index = 0; index < keys.length; index++) {
			const temp = await this.smembers(keys[index]);
			if(temp && temp.length !== 0) values.push(...temp);
		}
		return values;
	}
}