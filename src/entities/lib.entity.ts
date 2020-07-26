import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lib {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column('integer', {
    nullable: true,
  })
  issues: number;

  @Column('double precision', {
    nullable: true,
  })
  avgAge: number;

  @Column('double precision', {
    nullable: true,
  })
  stdAge: number;
}
