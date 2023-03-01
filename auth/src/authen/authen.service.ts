import { CreateUserInfoResDto } from './dto/res/create-user-info.res.dto';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/req/register-user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserInfoReqDto } from './dto/req/create-user-info.req.dto';

const users: { username: string; password: string; role: string }[] = [];

@Injectable()
export class AuthenService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
  ) {}

  login(loginDto: LoginDto) {
    if (loginDto.username === 'phat' && loginDto.password === '123') {
      return {
        status: 'success',
        msg: 'login success',
      };
    } else {
      return {
        status: 'fail',
        msg: 'login fail',
      };
    }
  }

  async register(registrationDto: RegisterUserDto) {
    // insert user into db
    users.push({
      username: registrationDto.username,
      password: registrationDto.password,
      role: 'user',
    });

    console.log('users', users);

    const id = users.length;
    const data: CreateUserInfoReqDto = {
      id: id,
      name: registrationDto.name,
      phone: registrationDto.phone,
      email: registrationDto.email,
    };

    const response: CreateUserInfoResDto = await firstValueFrom(
      this.usersClient.send('createUserInfo', data),
    );

    return response;
  }
}
