export const TYPES = {
	//Service
	AuthService : Symbol('AuthService'),
	MongooseService: Symbol('Mongoose'),
	UserService: Symbol('UserService'),
	ChatService: Symbol('ChatService'),
	MessageService: Symbol('MessageService'),
	FriendService: Symbol('FriendService'),
	MailService: Symbol('MailService'),

	//Middleware
	AuthGuard: Symbol('AuthGuard')
};