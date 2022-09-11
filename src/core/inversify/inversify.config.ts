import { Container } from 'inversify';
import { IUserService, UserService } from '../../api/users/service/users.service';
import { TYPES } from './types';
import { IMailService, MailService } from '../../shared/mail/mail.service';
import { Mongoose } from '../../database/mongoose';
import { UserRepository } from '../../api/users/repository/users.repository';
import { AuthService } from '../../api/auth/auth.service';

export const container = new Container({
	defaultScope: 'Singleton'
});

/////Controllers
import '../../api/users/controller/users.controller';
import '../../api/auth/auth.controller';
import '../../api/friends/controller/friends.controller';
import { AuthRepository } from '../../api/auth/repository/auth.repository';
import { FriendRepository } from '../../api/friends/repository/friends.repository';
import { FriendService, IFriendService } from '../../api/friends/service/friend.service';
import { FriendRequestRepository } from '../../api/friends/repository/friend_request.repository';

///////Bindings

/////Service
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<Mongoose>(TYPES.MongooseService).to(Mongoose);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IFriendService>(TYPES.FriendService).to(FriendService);
container.bind<IMailService>(TYPES.MailService).to(MailService);

/////Repository
container.bind(UserRepository).toSelf();
container.bind(AuthRepository).toSelf();
container.bind(FriendRepository).toSelf();
container.bind(FriendRequestRepository).toSelf();