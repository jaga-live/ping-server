import { request, Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, requestParam } from 'inversify-express-utils';
import { TYPES } from '../../core/inversify/types';
import { AuthService } from './auth.service';
import 'dotenv/config';
import { AuthGuard } from './middleware/auth.middleware';
import { Req } from '../../core/types/custom.types';
import { RefreshToken } from './middleware/auth.refresh';

@controller('/auth')
export class AuthController{
	constructor(
        @inject(TYPES.AuthService) private readonly authService: AuthService
	) { }
    
    /////Login User
    @httpPost('/login')
	async login(req: Request) {
		const { email } = req.body;
		return this.authService.login(email);
	}

    //////Send OTP
    @httpGet('/2fa/send_otp/:email')
    async sendOtp(req: Request) {
    	const { email } = req.params;
    	return this.authService.sendOtp(email);
    }


    /////Validate OTP
    @httpPost('/2fa/otp/validate')
    async validateOtp(req: Request) {
    	const { email, otp } = req.body;
        
    	return this.authService.validateOtp(email, otp);
    }

    ///get Access Token from Refresh Token
    @httpGet('/token/refresh', RefreshToken)
    async refreshAccessToken(req: Req) {
    	console.log(req.accessToken);
    	return {accessToken: req.accessToken};
        
    }

}