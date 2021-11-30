import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../_dto/user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  


  /////Register new User
  @Post()
  async registerUser(
    @Body() createUserDto : CreateUserDto
  ) {
    return this.userService.registerUser(createUserDto)
  }


}
