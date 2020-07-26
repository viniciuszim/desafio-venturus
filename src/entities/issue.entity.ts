import {
  Column,
  Entity,
  ManyToOne,
  ObjectType,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Lib } from './lib.entity';
import { Contributor } from './contributor.entity';
import { Label } from './label.entity';

@Entity()
export class Issue {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  state: string;

  @Column({
    nullable: false,
  })
  createdAt: Date;

  @Column({
    nullable: false,
  })
  updatedAt: Date;

  @Column({
    nullable: true,
  })
  closedAt: Date;

  @Column({
    nullable: true,
  })
  body: string;

  @ManyToOne(
    (): ObjectType<Lib> => Lib,
    ({ issues }): Issue[] => issues,
  )
  lib: Lib;

  @OneToMany(
    (): ObjectType<Contributor> => Contributor,
    ({ issue }): Issue => issue,
    {
      cascade: true,
    },
  )
  contributors: Contributor[];

  @OneToMany(
    (): ObjectType<Label> => Label,
    ({ issue }): Issue => issue,
    {
      cascade: true,
    },
  )
  labels: Label[];
}
