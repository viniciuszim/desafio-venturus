import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lib } from 'entities/lib.entity';

import { LibrariesController } from './libraries.controller';
import { LibrariesService } from './libraries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lib])],
  controllers: [LibrariesController],
  providers: [LibrariesService],
})
export class LibrariesModule {}
