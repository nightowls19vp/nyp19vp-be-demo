import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ClientKafka } from '@nestjs/microservices';
import { RegisterUserReqDto } from './dto/req/register-user.req';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('register');
    await this.authClient.connect();
    this.usersClient.subscribeToResponseOf('getAllUsers');
    await this.usersClient.connect();
  }
  @Post('register')
  async doRegistration(@Body() registrationDto: RegisterUserReqDto) {
    return await this.usersService.doRegistration(registrationDto);
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
}
