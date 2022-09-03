export const TYPES = {
	//Service
	AuthService : Symbol('AuthService'),
	MongooseService: Symbol('Mongoose'),
	UserService: Symbol('UserService'),
	MailService: Symbol('MailService'),

	//Middleware
	AuthGuard: Symbol('AuthGuard')
};