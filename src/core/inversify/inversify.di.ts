import { Container } from "inversify";
import { UserRepository } from "../../api/users/repository/users.repository";
import { UserService } from "../../api/users/service/users.service";
import { MongooseService } from "../../database/mongo";


/////Import Controllers
import '../../api/users/controller/users.controller'

export const di_container = new Container({
    defaultScope: 'Singleton'
})


di_container.bind(MongooseService).toSelf()
di_container.bind(UserService).toSelf()
di_container.bind(UserRepository).toSelf()