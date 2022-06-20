import *as HttpStatus from "http-status"
import { NextFunction, Response, Request } from 'express'
/////TODO - Handle Global Exception in Separate File

class ErrorHandler{
   
}


export default function GlobalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): any {

    console.log(err)
}