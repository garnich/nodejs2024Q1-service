import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IBaseUser, IFullUser } from './user.interface';
import { itemNotExistExeption, passwordsNotMatch } from 'src/helpers';
import { EXEPTION_ITEM, USER_VESION } from 'src/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ){}

  async getUsers(): Promise<IBaseUser[]> {
    const usersFind = await this.usersRepository.find();

    return usersFind.map((user) => user.toResponse());
  }

  async createUser(user: UserDto) {
    const dateNow = new Date().valueOf();

    const newUser: IFullUser = {
      id: uuidv4(),
      login: user.login,
      password: user.password,
      version: USER_VESION,
      createdAt: dateNow,
      updatedAt: dateNow,
    };

    const createdNewUser = this.usersRepository.create(newUser);

    return (await this.usersRepository.save(createdNewUser)).toResponse();
  }

  async getUser(id: string): Promise<IBaseUser> {
    const user = await this.usersRepository.findOneBy({id});
    
    if (user) {
      return user.toResponse();
    } else {
      throw itemNotExistExeption(EXEPTION_ITEM.USER);
    }
  }

  async updateUserPass(id: string, payload: UpdateUserDto) {
    const { oldPassword, newPassword } = payload;

    const user = await this.usersRepository.findOneBy({id});

    if (!user) {
      throw itemNotExistExeption(EXEPTION_ITEM.USER);
    }

    if (oldPassword !== user.password) {
      throw passwordsNotMatch();
    }

    const dateNow = new Date().valueOf();


    const newPassData = {
      password: newPassword,
      updatedAt: dateNow
    }

    Object.assign(user, newPassData);
    await this.usersRepository.save(user);

    return (await this.usersRepository.findOneBy({id})).toResponse();
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({id});

    if (!user) {
      throw itemNotExistExeption(EXEPTION_ITEM.USER);
    }

    await this.usersRepository.delete(id);
  }
}
