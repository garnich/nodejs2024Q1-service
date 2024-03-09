import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsBoolean()
  grammy: boolean;
}
