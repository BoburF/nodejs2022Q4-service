import { IsString, IsBoolean } from 'class-validator';

export class CreateUpdateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
