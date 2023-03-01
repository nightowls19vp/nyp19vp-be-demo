import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  userList: User[] = [];

  create({ id, name, phone, email }: CreateUserDto) {
    this.userList.push({ id, phone, name, email });

    console.log(this.userList);

    return {
      status: 'success',
      msg: `create user #${id} successfully`,
    };
  }

  findAll() {
    return this.userList;
  }

  async findOne(id: number) {
    console.log(
      `user service this.userlist find ${id}`,
      this.userList.find((user) => user.id == id),
    );

    const userFound = this.userList.find((user) => user.id == id);

    return userFound === undefined ? 'not found' : userFound;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
