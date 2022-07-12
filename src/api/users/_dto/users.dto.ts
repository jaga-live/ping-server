import Joi from "joi"

///////User DTO
export class User {
    constructor(
       public readonly _id: string,
       public readonly name: string,
       public readonly userName: string,
       public readonly email: string,
    ) { }
    
    static create(body: User) {
        return new User(
            body._id,
            body.name,
            body.userName,
            body.email
        )
    }
}



export class CreateUserDto{
    constructor(
       public readonly name: string,
       public readonly userName: string,
       public readonly email: string,
    ) { }
    
    public static async validate(dto: CreateUserDto) {

        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            userName: Joi.string().min(3).required()
        })

        const validate = await schema.validateAsync(dto)
        return validate

    }

}


