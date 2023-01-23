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
import '../../api/chats/controller/chats.controller';

import { AuthRepository } from '../../api/auth/repository/auth.repository';
import { FriendRepository } from '../../api/friends/repository/friends.repository';
import { FriendService, IFriendService } from '../../api/friends/service/friend.service';
import { FriendRequestRepository } from '../../api/friends/repository/friend_request.repository';
import { SocketProvider } from '../providers/sockets.provider';
import { ChatEvents } from '../../events/sockets/chats.events';
import { ChatService } from '../../api/chats/service/chat.service';
import { ChatRepository } from '../../api/chats/repository/chat.repository';
import { MessageRepository } from '../../api/message/repository/message.repository';
import { MessageService } from '../../api/message/service/message.service';
import { ChatEventsHandler } from '../../handlers/sockets/chat_events.handler';

///////Bindings

/////Service
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<Mongoose>(TYPES.MongooseService).to(Mongoose);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IFriendService>(TYPES.FriendService).to(FriendService);
container.bind<ChatService>(TYPES.ChatService).to(ChatService);
container.bind<MessageService>(TYPES.MessageService).to(MessageService);
container.bind<IMailService>(TYPES.MailService).to(MailService);

/////Repository
container.bind(UserRepository).toSelf();
container.bind(AuthRepository).toSelf();
container.bind(FriendRepository).toSelf();
container.bind(FriendRequestRepository).toSelf();
container.bind(ChatRepository).toSelf();
container.bind(MessageRepository).toSelf();

///Providers
container.bind<SocketProvider>(SocketProvider).to(SocketProvider);

///Events
container.bind<ChatEvents>(ChatEvents).to(ChatEvents);

///handlers
container.bind<ChatEventsHandler>(ChatEventsHandler).to(ChatEventsHandler);