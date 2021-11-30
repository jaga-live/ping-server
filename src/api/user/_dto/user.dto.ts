import { Type } from "class-transformer"
import {IsInt, IsNotEmpty, IsNumber, IsString, Length, Max, Min} from "class-validator"


export class UserDto {
    name: string
    
    email: string
    
    phone: string

    bio: string
}



export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    email: string
    
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    phone: number
    
    @IsNotEmpty()
    @IsString()
    password : string
}