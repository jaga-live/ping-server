import { Schema, model } from "mongoose";


export interface IUser {
    name: string
    email: string
    age?: Number
}

export const UserSchema = new Schema({
    name: String,
    email: String
})


// export const userModel = model('users', UserSchema)

// export default model<User>('users', UserSchema)
export type UserModel = typeof UserSchema