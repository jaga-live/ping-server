import { Schema, model } from "mongoose";


export interface IUser {
    _id: string,
    name: string
    userName: string
    email: string
    age?: Number
}

export const UserSchema = new Schema({
    name: String,
    userName: String,
    email: String,
})


// export const userModel = model('users', UserSchema)

// export default model<User>('users', UserSchema)
export type UserModel = typeof UserSchema