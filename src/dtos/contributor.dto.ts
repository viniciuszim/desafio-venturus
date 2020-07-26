import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, Length } from 'class-validator';

@Exclude()
export class ContributorDTO {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 100)
  login: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 100)
  avatarUrl: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 150)
  url: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 255)
  reposUrl: string;
}
