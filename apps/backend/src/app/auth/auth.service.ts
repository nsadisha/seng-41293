import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  
  constructor(
    private userService: UserService
  ){}
  
  register(createAuthDto: CreateAuthDto) {
    return this.userService.create(createAuthDto);
  }

  login(loginAuthDto: LoginAuthDto){

  }
}
