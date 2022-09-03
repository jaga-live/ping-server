import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';


export class AuthGuard extends BaseMiddleware{
	public handler(req: Request,  res: Response, next: NextFunction): void {
		console.log('Auth Middleware'); 
		next();
	}
}