import 'reflect-metadata'

import { App } from './core/app'
import { Mongoose } from './database/mongoose'
import { MailService } from './shared/mail/mail.service'

async function bootstrap() {
    ///Connect to MongoDB Atlas
    new Mongoose().connect()

    ///Start Server
    new App().start()

    ////TEST
    new MailService().sendMail()
}

bootstrap()