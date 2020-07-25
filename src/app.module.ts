import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lib } from 'entities/lib.entity';
import { Todo } from 'entities/todo.entity';

import { LibrariesController } from 'modules/libraries/libraries.controller';
import { LibrariesService } from 'modules/libraries/libraries.service';
import { TodosController } from 'modules/todos/todos.controller';
import { TodosService } from 'modules/todos/todos.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Lib, Todo])],
  controllers: [AppController, LibrariesController, TodosController],
  providers: [AppService, LibrariesService, TodosService],
})
export class AppModule {}
