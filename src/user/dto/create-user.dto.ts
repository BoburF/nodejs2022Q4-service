import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id?: string;
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
