import {
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4, validate } from 'uuid';
import User from './interface/user.interface';

const users: User[] = [];

@Injectable()
export class UserService {
  find(): User[] {
    return users;
  }

  create({ login, password }): Omit<User, 'password'> {
    const id: string = v4();
    const createdAt: number = new Date().getTime();

    const newUser = {
      id,
      login,
      password,
      version: 1,
      createdAt,
      updatedAt: createdAt,
    };

    users.push(newUser);

    return {
      id,
      login,
      version: newUser.version,
      createdAt,
      updatedAt: newUser.updatedAt,
    };
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
      user.version = user.version + 1;
      user.updatedAt = new Date().getTime();
      users[index] = user;
    } else {
      throw new ForbiddenException('Password is incorrect');
    }
    delete user['password'];
    return user;
  }

  delete(id: string) {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    let index: number | null;
    const user: User | null = users.find((user, idx) => {
      if (user.id === id) {
        index = idx;
        return user;
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    users.splice(index, 1);

    return user;
  }
}
