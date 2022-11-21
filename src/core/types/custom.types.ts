import { Request } from 'express';


///Express Request Type
interface userData{
    jwtToken: string,
    userId: string,
    email: string,
    role: string,
}
export interface Req extends Request{
    userData: userData,
    accessToken: string
}