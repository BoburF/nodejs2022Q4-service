import {
  BadRequestException,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import {compare, hash} from "bcrypt";
import { CreateUserDto } from './dto/create-user.dto';
import { timeSet, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async find() {
    return (await this.userRepository.find()).map((user) => user.toResponse());
  }

  async create(CreateUserDto: CreateUserDto) {
    const password = await hash(CreateUserDto.password, 10)
    const createUser = this.userRepository.create({...CreateUserDto, password });

    return (await this.userRepository.save(createUser)).toResponse();
  }

  async findOne(id: string): Promise<User> {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }

    const user: User | null = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateOne({ oldPassword, newPassword }, id: string) {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    const user: User | null = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (await compare(newPassword, oldPassword)) {
      newPassword = await hash(newPassword, 10)
      user.password = newPassword;
      user.version = user.version + 1;
      user.updatedAt = timeSet();
      return (await this.userRepository.save(user)).toResponse();
    }

    throw new ForbiddenException('Password is incorrect');
  }

  async delete(id: string) {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    const user = await this.userRepository.delete(id);
    if (user.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
