import { NextFunction, Request, Response } from 'express';

export const AuthGuard = (req: Request, res: Response, next: NextFunction) => {
	console.log('Auth Middleware');
	next();

};