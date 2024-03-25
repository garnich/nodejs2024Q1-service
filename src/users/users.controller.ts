import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersService } from './users.service';
import {
  IDValidator,
  invalidIdExeption,
  itemNotExistExeption,
} from 'src/helpers';
import { EXEPTION_ITEM, HEADERS, UUID_VERSION } from 'src/constants';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.getUsers();
  }

  @Post()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body(new ValidationPipe()) CreateUserDto: UserDto) {
    return this.userService.createUser(CreateUserDto);
  }

  @Put(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  updateUserPass(
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isUserExist = !!this.userService.getUser(id);

      if (!isUserExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.USER);
      } else {
        return this.userService.updateUserPass(id, updateUserDto);
      }
    }
  }

  @Delete(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isUserExist = !!this.userService.getUser(id);

      if (!isUserExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.USER);
      } else {
        return this.userService.deleteUser(id);
      }
    }
  }

  @Get(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  findById(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const user = this.userService.getUser(id);

      if (!user) {
        throw itemNotExistExeption(EXEPTION_ITEM.USER);
      } else {
        return user;
      }
    }
  }
}
