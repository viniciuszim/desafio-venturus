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
export class Label {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  color: string;

  @Column({
    nullable: false,
  })
  url: string;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(
    (): ObjectType<Issue> => Issue,
    ({ labels }): Label[] => labels,
  )
  @JoinColumn({
    name: 'issueId',
    referencedColumnName: 'id',
  })
  issue: Issue;
}
