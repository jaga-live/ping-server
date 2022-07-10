import 'reflect-metadata'

import { App } from './core/app'
import { Mongoose } from './database/mongoose'

async function bootstrap() {
    ///Connect to MongoDB Atlas
    new Mongoose().connect()

    ///Start Server
    new App().start()
}

bootstrap()