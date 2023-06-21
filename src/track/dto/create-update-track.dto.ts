import { IsString, IsNumber, ValidateIf, IsOptional } from 'class-validator';

export class CreateUpdateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @IsNumber()
  duration: number;
}
