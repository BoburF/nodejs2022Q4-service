import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateUpdateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  artistId: string | null;
}
