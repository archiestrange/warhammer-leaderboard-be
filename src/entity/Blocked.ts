import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { User } from './User';

@Entity()
export class Blocked {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user)
  blocker: Relation<User>;

  @ManyToOne(() => User, (user) => user)
  blockee: Relation<User>;
}
