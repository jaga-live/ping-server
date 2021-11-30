import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../model/user.model';
import { CreateUserDto } from '../_dto/user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('users') private readonly userModel : Model<UserModel>
    ) { }
    


    /////Register a new User
    async registerUser(data : CreateUserDto) {

        let { phone } = data
        
        var isUserRegistered = await this.findUserByPhone(phone)
        if(isUserRegistered) throw new ConflictException('User Already Exists')

        data.password = hashSync(data.password, 12)
        await this.userModel.insertMany(data)        

        return {
            message : "Registered Successfully"
        }
    }



    /////Find User by Phone
    async findUserByPhone(phone: number) {
        
        var user = await this.userModel.findOne({ phone }, { _id: 1 })
        
        return user
    }

}
