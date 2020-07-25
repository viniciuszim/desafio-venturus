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

  @Column({
    nullable: true,
  })
  issues: number;

  @Column({
    nullable: true,
  })
  avgAge: string;

  @Column({
    nullable: true,
  })
  stdAge: string;
}
