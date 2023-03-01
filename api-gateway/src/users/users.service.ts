import { RegisterUserResDto } from './dto/res/register-user.res';
import { firstValueFrom } from 'rxjs';
import { RegisterUserReqDto } from './dto/req/register-user.req';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
  ) {}

  async doRegistration(registration: RegisterUserReqDto) {
    console.log('send register');

    const response: any = await firstValueFrom(
      this.authClient.send('register', registration),
    );

    console.log('register1', response);

    return response;
  }

  async getAllUsers() {
    const response: any = await firstValueFrom(
      this.usersClient.send('getAllUsers', {}),
    );

    console.log('getAllUsers', response);

    return response;
  }
}
