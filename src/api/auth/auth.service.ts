import { inject, injectable } from 'inversify';
import { v4 } from 'uuid';
import { HttpException } from '../../core/exception';
import { randomSixDigitOtp } from '../../helper/calc';
import User, { IUser } from '../users/model/users.model';
import { UserRepository } from '../users/repository/users.repository';
import * as jwt from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcrypt';
import { TYPES } from '../../core/inversify/types';
import { MailService } from '../../shared/mail/mail.service';
import { AuthRepository } from './repository/auth.repository';
import { Types } from 'mongoose';

@injectable()
export class AuthService{
	private readonly JWT_SECRET: any = process.env.JWT_SECRET;
	constructor(
		@inject(UserRepository) private readonly UserRepo: UserRepository,
		@inject(AuthRepository) private readonly AuthRepo: AuthRepository,
        @inject(TYPES.MailService) private readonly mailService: MailService
	) { }
    
	/////Login with Email Pass
	async login(email: string) {
        
		/////Validate User
		const isUserValid = await this.UserRepo.find_by_email(email);
		if (!isUserValid) throw new HttpException('Invalid Email or Password', 400);
        
		///Send OTP via Email
		await this.sendOtp(email);
		return {
			message: 'OTP sent'
		};
	}

	///////Two Factor Auth - 2FA
	////Send OTP
	async sendOtp(email: string) {
     
		////Get User Info
		const user = await this.UserRepo.find_by_email(email);
		if (!user) throw new HttpException('Email not found', 400);

        
		const otp = randomSixDigitOtp().toString();
		const otpHash = hashSync(otp, 12);
		const signature = jwt.sign({}, this.JWT_SECRET, { expiresIn: '300s' });

		/////Update OTP for the user
		await User.updateOne({ _id: user._id }, {
			$set: {
				_2fa: {
					otp: otpHash,
					signature
				}
			}
		});

		await this.AuthRepo.create({
			_2fa: {
				otp: otpHash,
				signature
			},
			userId: new Types.ObjectId(user._id)
		});


		////TODO - Mail OTP
		this.mailService.sendMail({
			type: 'send_otp',
			to: email,
			context: {
				otp
			}
		});

		return {
			message: 'OTP sent',
			dev_otp: otp
		};
	}


	////Validate OTP
	async validateOtp(email: string, otp: number) {
        
		////Get User Info
		const user: IUser = await this.UserRepo.find_by_email(email);
		if (!user) throw new HttpException('Email not found', 400);

		///Get Ref
		
        
		/////Validate OTP
		// const { _2fa } = user;
		const _2fa = {signature: '', otp: ''};
		if (!_2fa) throw new HttpException('OTP Expired', 400);

		try {
			jwt.verify(_2fa.signature, this.JWT_SECRET);
		} catch (e) { throw new HttpException('OTP Expired', 400); }

		if (!compareSync(otp.toString(), _2fa.otp)) throw new HttpException('Invalid OTP', 400);
        
		////Create Session
		const sessionId = v4();
		const jwtToken = jwt.sign({
			_id: user._id,
			email,
			role: user.role,
			sessionId
		}, this.JWT_SECRET);

		////Update Session for the User
		await User.updateOne({ _id: user._id }, {
			$push: { session: sessionId },
			$set: {
				_2fa: null
			}
		});

		return {
			status: 'ok',
			token: jwtToken
		};
	}

}