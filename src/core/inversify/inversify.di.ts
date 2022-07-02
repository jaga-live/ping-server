import 'reflect-metadata'
import { Container } from "inversify";
import { UserRepository } from "../../api/users/repository/users.repository";
import { UserService } from "../../api/users/service/users.service";
import { MongooseService } from "../../database/mongo";

/////Import Controllers
import '../../api/users/controller/users.controller'
import { AuthGuard } from "../../api/auth/auth.midleware";
import { TYPES } from "../types";
import { MailService } from '../../api/mail/mail';

export const container = new Container({
    defaultScope: 'Singleton'
})


///Middleware
container.bind<AuthGuard>(TYPES.AuthGuard).to(AuthGuard)

/////Service
container.bind(MongooseService).toSelf()
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<MailService>(TYPES.MailService).to(MailService)

/////Repository
container.bind(UserRepository).toSelf()

