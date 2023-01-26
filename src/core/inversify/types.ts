export const TYPES = {
	//Service
	AuthService : Symbol('AuthService'),
	MongooseService: Symbol('Mongoose'),
	UserService: Symbol('UserService'),
	ChatService: Symbol('ChatService'),
	MessageService: Symbol('MessageService'),
	FriendService: Symbol('FriendService'),
	
	///Shared Service
	MailService: Symbol('MailService'),
	RedisService: Symbol('RedisService'),
	
	//Middleware
	AuthGuard: Symbol('AuthGuard')
};