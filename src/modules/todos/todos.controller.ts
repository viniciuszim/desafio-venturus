import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoRO } from './_dtos/todo.ro';
import { TodoDTO } from './_dtos/todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @Get()
  async index(): Promise<TodoRO[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() body: TodoDTO): Promise<TodoRO> {
    return this.service.create(body);
  }

  @Get('/:id')
  async show(@Param('id') id: number): Promise<TodoRO> {
    return this.service.findById(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() body: TodoDTO,
  ): Promise<TodoRO> {
    return this.service.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
}
