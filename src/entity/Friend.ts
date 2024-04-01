import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { User } from './User';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user)
  user: Relation<User>;

  @ManyToOne(() => User, (user) => user)
  friend: Relation<User>;
}
