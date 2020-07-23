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
import { TodoRO } from './todo.ro';
import { CreateTodoDTO } from './todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @Get()
  index(): Promise<TodoRO[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: CreateTodoDTO): Promise<TodoRO> {
    return this.service.create(body);
  }

  @Get('/:id')
  show(@Param('id') id: number): Promise<TodoRO> {
    return this.service.findById(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: number,
    @Body() body: CreateTodoDTO,
  ): Promise<TodoRO> {
    return this.service.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id') id: number): void {
    this.service.delete(id);
  }
}
