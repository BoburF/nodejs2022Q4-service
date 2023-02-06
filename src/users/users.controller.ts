import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Put,
  Param,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto } from './dto/create-user.dto';
import User from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  getUsers(): User[] {
    return this.usersService.find();
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.create(CreateUserDto);
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param() params) {
    return this.usersService.findOne(params.id);
  }

  @Put(':id')
  updateUser(@Body() CreateUserDto: CreateUserDto, @Param() params) {
    return this.usersService.updateOne(CreateUserDto, params.id);
  }
}
