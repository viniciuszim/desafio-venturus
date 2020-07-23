import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from '../../entities/todo.entity';
import { TodoDTO } from './_dtos/todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  public async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  public async findById(id: number): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo '${id}' was not found`);
    }
    return todo;
  }

  public async create(todo: TodoDTO): Promise<Todo> {
    return await this.todoRepository.save(todo);
  }

  public async update(id: number, newValue: TodoDTO): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo '${id}' was not found`);
    }
    await this.todoRepository.update(id, newValue);
    return await this.todoRepository.findOne(id);
  }

  public async delete(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo '${id}' was not found`);
    }
    await this.todoRepository.delete(id);
  }
}
