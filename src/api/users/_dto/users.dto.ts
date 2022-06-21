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


//////Create User DTO
export class CreateUserDto{
    constructor(
       public readonly name: string,
       public readonly userName: string,
       public readonly email: string,
    ) { }
    
    static create(body: CreateUserDto) {
        if (!body.name) {
            throw new Error('Name Missing')
        }

        return new CreateUserDto(
            body.name,
            body.userName,
            body.email
        )
    }
}

