import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { User } from './User';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user)
  sender: Relation<User>;

  @ManyToOne(() => User, (user) => user)
  receiver: Relation<User>;
}
