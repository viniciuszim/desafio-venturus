import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Todo } from './todo.entity';
import { CreateTodoDTO } from './todo.dto';

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
    return await this.todoRepository.findOneOrFail(id);
  }

  public async create(todo: CreateTodoDTO): Promise<Todo> {
    return await this.todoRepository.save(todo);
  }

  public async update(
    id: number,
    newValue: CreateTodoDTO,
  ): Promise<Todo | null> {
    const todo = await this.todoRepository.findOneOrFail(id);
    if (!todo.id) {
      throw new NotFoundException(`Todo '${id}' was not found`);
    }
    await this.todoRepository.update(id, newValue);
    return await this.todoRepository.findOne(id);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.todoRepository.delete(id);
  }
}
