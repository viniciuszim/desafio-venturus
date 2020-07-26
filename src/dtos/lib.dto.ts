import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class LibDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  @IsString()
  @Length(0, 100)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @Length(0, 255)
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly issues: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly avgAge: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly stdAge: number;
}
