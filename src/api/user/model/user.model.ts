import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = UserModel & Document

@Schema()
export class UserModel  {

    @Prop()
    name: string

    @Prop()
    email: string
    
    @Prop({
        unique : true
    })
    phone: number
    
    @Prop()
    bio: string
    
    @Prop({
        type : Object
    })
    profileImage: object
    
    @Prop()
    password: string

    @Prop()
    jwt : string[]
    
}


export const UserSchema =  SchemaFactory.createForClass(UserModel)