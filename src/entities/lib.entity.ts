import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lib {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  issues: number;

  @Column()
  avgAge: string;

  @Column()
  stdAge: string;
}
