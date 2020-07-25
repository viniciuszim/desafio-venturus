import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LibDTO } from 'dtos/lib.dto';
import { Lib } from 'entities/lib.entity';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectRepository(Lib)
    private readonly libRepository: Repository<Lib>,
  ) {}

  public async findAll(): Promise<Lib[]> {
    return await this.libRepository.find();
  }

  public async findById(id: number): Promise<Lib | null> {
    const lib = await this.libRepository.findOne(id);
    if (!lib) {
      throw new NotFoundException(`Lib '${id}' was not found`);
    }
    return lib;
  }

  public async create(lib: LibDTO): Promise<Lib> {
    return await this.libRepository.save(lib);
  }

  public async update(id: number, newValue: LibDTO): Promise<Lib | null> {
    let lib = await this.findById(id);
    lib = {
      ...lib,
      ...newValue,
    };

    await this.libRepository.update(id, lib);
    return await this.libRepository.findOne(id);
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.libRepository.delete(id);
  }
}
