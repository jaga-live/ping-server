import { NextFunction, Response } from 'express';
import { HttpException } from '../../../core/exception';
import Auth from '../../auth/model/auth.model';
import User from '../../users/model/users.model';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Req } from '../../../core/types/custom.types';
import { v4 } from 'uuid';
import { IUser } from '../../users/model/users.model';

export const RefreshToken = async (req: Req, res: Response, next: NextFunction) => {
	try {
		const refreshToken: any = (req.headers['x-refresh-token']);
		if (!refreshToken) throw new HttpException('Refresh Token Missing in request headers', 401);
		console.log('Token Present');
		///Validate JWt
		const {userId}: any = jwt.verify(refreshToken, process.env.JWT_SECRET);
       

		////Create Access Token
		const {email, role}: IUser = await User.findOne({ _id: userId });
		const sessionId = v4();

		const jwtToken = jwt.sign({
			userId,
			email,
			role,
			sessionId
		}, process.env.JWT_SECRET, { expiresIn: '30s' });

		///Update Session
		await Auth.updateOne({ userId }, {
			$push: { jwtSession: sessionId },
			$set: {
				_2fa: {
					signature: null,
					otp: null
				}
			}
		});

		req.accessToken = jwtToken;
		next();
		
	} catch (error) {
		return res.status(401).send({error: 'Not Authorized'});
	}


};