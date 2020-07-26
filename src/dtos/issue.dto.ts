import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@Exclude()
export class IssueDTO {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 100)
  title: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 10)
  state: string;

  @ApiProperty()
  @Expose()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @IsDateString()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  @IsDateString()
  @IsOptional()
  closedAt: Date;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 255)
  @IsOptional()
  body: string;
}
