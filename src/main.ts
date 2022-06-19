import 'reflect-metadata'
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { UserService } from './api/users/users.service';
import { UserRepository } from './api/users/users.repository';



//Database
import './database/mongo'
//Controller
import './api/users/users.controller'

export async function start() {

    ///Inversify
    const container = new Container()

    container.bind(UserService).toSelf()
    container.bind(UserRepository).toSelf()
    
    //Servr Config
    const server = new InversifyExpressServer(container)
    const app = server.build()
    app.listen(process.env.PORT, ()=> console.log('Server is running'))

}


start()