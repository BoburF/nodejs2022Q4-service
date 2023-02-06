import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateUpdateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  artistId: string | null;

  @IsOptional()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
