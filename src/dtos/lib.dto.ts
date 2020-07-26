import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IssueDTO } from './issue.dto';

@Exclude()
export class LibDTO {
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
  fullName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 150)
  url: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 255)
  description: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 150)
  issuesUrl: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 150)
  labelsUrl: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @Length(0, 150)
  contributorsUrl: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  stargazersCount: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  forksCount: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  openIssues: number;

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
  issues: IssueDTO[];

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  avgAge: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  stdAge: number;
}
