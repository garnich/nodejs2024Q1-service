import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly duration: number;

  @IsOptional()
  @IsString()
  readonly artistId: string | null; // refers to Artist

  @IsOptional()
  @IsString()
  readonly albumId: string | null; // refers to Album
}
