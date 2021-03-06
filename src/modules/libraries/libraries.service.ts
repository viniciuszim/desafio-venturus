import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LibDTO } from 'dtos/lib.dto';
import { Lib } from 'entities/lib.entity';
import { GithubService } from 'services/github.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectRepository(Lib)
    private readonly libRepository: Repository<Lib>,
  ) {}

  public async findByRepository(repository: string): Promise<LibDTO> {
    const githubService = new GithubService();
    const lib = await githubService.findByRepository(repository);

    const exist = await this.findByName(lib.name);
    if (!exist) {
      return await this.create(lib);
    }
    return await this.update(exist.id, lib);
  }

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

  private async findByName(name: string): Promise<Lib | null> {
    try {
      return await this.libRepository
        .createQueryBuilder('lib')
        .select('lib')
        .where('lib.name = :name', {
          name,
        })
        .getOne();
    } catch (error) {
      return null;
    }
  }

  public async create(lib: LibDTO): Promise<LibDTO> {
    return plainToClass(LibDTO, await this.libRepository.save(lib));
  }

  public async update(id: number, newValue: LibDTO): Promise<LibDTO> {
    await this.findById(id);

    return plainToClass(
      LibDTO,
      await this.libRepository.save({
        id,
        ...newValue,
      }),
    );
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.libRepository.delete(id);
  }
}
