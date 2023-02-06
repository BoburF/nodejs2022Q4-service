import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4, validate } from 'uuid';
import User from './user.interface';

const users: User[] = [];

@Injectable()
export class UsersService {
  find(): User[] {
    return users;
  }

  create({ login, password }): User {
    const id: string = v4();
    const createdAt: number = new Date().getTime();

    const newUser = {
      id,
      login,
      password,
      version: 0,
      createdAt,
      updatedAt: createdAt,
    };

    users.push(newUser);

    return newUser;
  }

  findOne(id: string): User {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }

    const user: User | null = users.find((user) => id === user.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  updateOne({ oldPassword, newPassword }, id: string): User {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    let index: number | null;
    const user: User | null = users.find((user, idx) => {
      if (id === user.id) {
        index = idx;
        return user;
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (oldPassword === user.password) {
      user.password = newPassword;
      users[index] = user;
    }

    return user;
  }
}
