import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LibDTO } from 'dtos/lib.dto';
import { LibrariesService } from './libraries.service';

const swaggerEntity = 'Lib';
const swaggerEntityNotFound = 'Record not found';

@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('libraries')
@Controller('libraries')
export class LibrariesController {
  constructor(private readonly service: LibrariesService) {}

  @Get('/search')
  async searchRepository(
    @Query('repository') repository: string,
  ): Promise<LibDTO> {
    return this.service.findByRepository(repository);
  }

  @Get()
  @ApiOperation({ summary: `Find all ${swaggerEntity}` })
  @ApiResponse({
    status: 200,
    description: 'List of records found',
  })
  async index(): Promise<LibDTO[]> {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: `Create ${swaggerEntity}` })
  @ApiResponse({
    status: 201,
    description: 'The record saved',
    type: LibDTO,
  })
  async create(@Body() body: LibDTO): Promise<LibDTO> {
    return this.service.create(body);
  }

  @Get('/:id')
  @ApiOperation({ summary: `Find one ${swaggerEntity}` })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: LibDTO,
  })
  @ApiResponse({
    status: 404,
    description: `${swaggerEntityNotFound}`,
  })
  async show(@Param('id') id: number): Promise<LibDTO> {
    return this.service.findById(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: `Update ${swaggerEntity}` })
  @ApiResponse({
    status: 200,
    description: 'The record updated',
    type: LibDTO,
  })
  @ApiResponse({
    status: 404,
    description: `${swaggerEntityNotFound}`,
  })
  async update(@Param('id') id: number, @Body() body: LibDTO): Promise<LibDTO> {
    return this.service.update(id, body);
  }

  @Delete('/destroy-all')
  @HttpCode(204)
  async deleteAll(): Promise<void> {
    return this.service.deleteAll();
  }

  @Delete('/:id')
  @ApiOperation({ summary: `Delete ${swaggerEntity}` })
  @ApiResponse({
    status: 204,
    description: 'Successful delete',
  })
  @ApiResponse({
    status: 404,
    description: `${swaggerEntityNotFound}`,
  })
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
}
