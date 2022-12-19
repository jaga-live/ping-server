import Joi from 'joi';
import { ValidationException } from '../../../core/exception';

///////User DTO
export class UserDto {
	constructor(
       public readonly _id: string,
       public readonly name: string,
       public readonly user_name: string,
       public readonly user_tag: string,
       public readonly email: string,
	) { }
    
	static create(body: UserDto) {
		return new UserDto(
			body._id,
			body.name,
			body.user_name,
			body.user_tag,
			body.email
		);
	}
}



export class CreateUserDto{
	constructor(
       public readonly name: string,
       public readonly user_name: string,
       public readonly user_tag: string,
       public readonly email: string,
	) { }
    
	public static async validate(dto: CreateUserDto) {
		const schema = Joi.object({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			user_name: Joi.string().min(3).required(),
			user_tag: Joi.string().min(4).required(),
		});
		const validate = await schema.validateAsync(dto).catch((err) => {
			throw new ValidationException('Validation Exception', err, 400);
		});
		return validate;

	}

}


