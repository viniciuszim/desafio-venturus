import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

@Exclude()
export class LabelDTO {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 100)
  name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 100)
  color: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 150)
  url: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 255)
  @IsOptional()
  description: string;
}
