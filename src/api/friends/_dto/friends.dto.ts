import Joi from 'joi';
import { Types } from 'mongoose';

export const FriendRequestActions = [
	'accept',
	'reject'
];

export class CreateFriendDto{
	constructor(
        public users: [Types.ObjectId],
        public status?: string,
        public isBlocked?: boolean,
	) { }
    
	public async validate(payload: CreateFriendDto) {
		const schema = Joi.object({
			users: Joi.array().required(),
			status: Joi.string().required(),
			isBlocked: Joi.boolean().required()
		});

		const validate = await schema.validateAsync(payload);
		return validate;
	}
}