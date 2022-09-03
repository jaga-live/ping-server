import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { TYPES } from '../../core/inversify/types';
import { AuthService } from './auth.service';
import 'dotenv/config';

@controller('/auth')
export class AuthController{
	constructor(
        @inject(TYPES.AuthService) private readonly authService: AuthService
	) { }
    
    /////Login User
    @httpPost('/login')
	async login(req: Request) {
		const { email, password } = req.body;
		return this.authService.login(email, password);
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
}