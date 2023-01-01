import { NextFunction, Response } from 'express';
import { HttpException } from '../../../core/exception';
import Auth from '../../auth/model/auth.model';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Req } from '../../../core/types/custom.types';

export const AuthGuard = async (req: Req, res: Response, next: NextFunction) => {
	try {
		const authToken: string | undefined = (req.headers.authorization)?.split(' ')[1];
		if (!authToken) throw new HttpException('Bearer Token Missing in request headers', 401);
		
		///Validate JWt
		// try {
		const verify: any = jwt.verify(authToken, process.env.JWT_SECRET);
		if(!verify?.apps?.ping) throw new HttpException('Unauthorized Exception', 401);
		// } catch (error) {
		// 	if (error.name === 'TokenExpiredError') {
		// 		const {userId, sessionId}: any = jwt.verify(authToken, process.env.JWT_SECRET, {ignoreExpiration: true});
		// 		await Auth.updateOne({ userId }, {
		// 			$pull: {
		// 				jwtSession: sessionId
		// 			}
		// 		});
		// 	}
		// }

		///Validate User Session
		const userId = verify.apps.ping.userId;
		const getAuth = await Auth.findOne({
			userId
		});
		if (!getAuth) throw new Error();

		req.userData = verify;
		req.userData.userId = userId;
		req.userData.jwtToken = authToken;
		next();
		
	} catch (error) {
		console.log(error);
		return res.status(401).send({error: 'Not Authorized'});
	}


};