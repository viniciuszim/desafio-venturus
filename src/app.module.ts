import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lib } from 'entities/lib.entity';

import { LibrariesController } from 'modules/libraries/libraries.controller';
import { LibrariesService } from 'modules/libraries/libraries.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Lib])],
  controllers: [AppController, LibrariesController],
  providers: [AppService, LibrariesService],
})
export class AppModule {}
