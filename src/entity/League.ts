import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { User } from './User';

@Entity()
export class League {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user)
  owner: Relation<User>;

  @Column()
  private: boolean;
}
