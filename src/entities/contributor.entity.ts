import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectType,
  PrimaryColumn,
} from 'typeorm';
import { Issue } from './issue.entity';

@Entity()
export class Contributor {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable: false,
  })
  login: string;

  @Column({
    nullable: false,
  })
  avatarUrl: string;

  @Column({
    nullable: false,
  })
  url: string;

  @Column({
    nullable: false,
  })
  reposUrl: string;

  @ManyToOne(
    (): ObjectType<Issue> => Issue,
    ({ contributors }): Contributor[] => contributors,
  )
  @JoinColumn({
    name: 'issueId',
    referencedColumnName: 'id',
  })
  issue: Issue;
}
