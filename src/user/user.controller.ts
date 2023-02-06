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
import { UpdateUserDto } from './dto/update-user.dto';
import User from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  getUsers(): User[] {
    return this.userService.find();
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateOne(updateUserDto, id);
  }
}
