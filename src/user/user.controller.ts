import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
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
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
