import Joi from 'joi';

///////User DTO
export class UserDto {
	constructor(
       public readonly _id: string,
       public readonly name: string,
       public readonly user_name: string,
       public readonly email: string,
	) { }
    
	static create(body: UserDto) {
		return new UserDto(
			body._id,
			body.name,
			body.user_name,
			body.email
		);
	}
}



export class CreateUserDto{
	constructor(
       public readonly name: string,
       public readonly user_name: string,
       public readonly email: string,
	) { }
    
	public static async validate(dto: CreateUserDto) {

		const schema = Joi.object({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			user_name: Joi.string().min(3).required()
		});

		const validate = await schema.validateAsync(dto);
		return validate;

	}

}


