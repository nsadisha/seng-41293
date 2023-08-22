import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from '../user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { SuccessAuthDto } from './dto/success-auth.dto';

@Injectable()
export class AuthService {
  
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}
  
  register(createAuthDto: CreateAuthDto) {
    return this.userService.create(createAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto){
    const user = await this.userService.findUserWithEmail(loginAuthDto.email) as unknown as UserDto;
    if(!user){
      throw new NotFoundException('Email not found!');
    }
    
    const isLoginSuccess: boolean = user.password === loginAuthDto.password;

    if(!isLoginSuccess){
      throw new UnauthorizedException('Invalid password!');
    }

    const payload = { sub: user._id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    const successResponse: SuccessAuthDto = {
      success: isLoginSuccess,
      email: user.email,
      access_token: access_token
    };

    return successResponse;
  }
}
