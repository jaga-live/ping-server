import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './api/user/user.module';


////Imports
import { Ping } from "./core/ping"


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),

    UserModule
  ],
  controllers: [Ping],
  providers: [],
})
export class AppModule {}
