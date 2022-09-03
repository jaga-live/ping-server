import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';


export class AuthGuard extends BaseMiddleware{
	public handler(req: Request, res: Response, next: NextFunction) {
        
		///TODO - Auth Middleware
		console.log(req.url);
		next();

	}
}