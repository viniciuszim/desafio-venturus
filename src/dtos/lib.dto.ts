import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumber } from 'class-validator';

export class LibDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  @IsString()
  @Length(0, 100)
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  readonly issues: number;

  @ApiProperty()
  @IsString()
  readonly avgAge: string;

  @ApiProperty()
  @IsString()
  readonly stdAge: string;
}
