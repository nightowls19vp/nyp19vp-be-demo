import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenService } from './authen.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/req/register-user.dto';

@Controller()
export class AuthenController implements OnModuleInit {
  constructor(
    private readonly authenService: AuthenService,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
  ) {}
  async onModuleInit() {
    this.usersClient.subscribeToResponseOf('createUserInfo');
    await this.usersClient.connect();
  }

  @MessagePattern('login')
  login(@Payload() loginDto: LoginDto) {
    return this.authenService.login(loginDto);
  }

  @MessagePattern('register')
  async register(@Payload() registerUserDto: RegisterUserDto) {
    console.log('ctl register');

    return await this.authenService.register(registerUserDto);
  }
}
