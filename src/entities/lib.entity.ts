import {
  Column,
  Entity,
  JoinColumn,
  ObjectType,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Issue } from './issue.entity';

@Entity()
export class Lib {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  fullName: string;

  @Column({
    nullable: false,
  })
  url: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    nullable: false,
  })
  issuesUrl: string;

  @Column({
    nullable: false,
  })
  labelsUrl: string;

  @Column({
    nullable: false,
  })
  contributorsUrl: string;

  @Column('integer', {
    nullable: false,
  })
  stargazersCount: number;

  @Column('integer', {
    nullable: false,
  })
  forksCount: number;

  @Column('integer', {
    nullable: false,
  })
  openIssues: number;

  @Column({
    nullable: false,
  })
  createdAt: Date;

  @Column({
    nullable: false,
  })
  updatedAt: Date;

  @Column('double precision', {
    nullable: true,
  })
  avgAge: number;

  @Column('double precision', {
    nullable: true,
  })
  stdAge: number;

  @OneToMany(
    (): ObjectType<Issue> => Issue,
    ({ lib }): Lib => lib,
    {
      cascade: true,
    },
  )
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'libId',
  })
  issues: Issue[];
}
