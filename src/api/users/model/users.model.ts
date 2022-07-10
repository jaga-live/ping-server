import { model, Schema } from "mongoose";


export const UserSchma = new Schema({
    name: String,
    email: String,
    userName: String,
    password: String,
    session: [String],
    _2fa: Object
})

export const User = model('users', UserSchma)