import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { Community } from './Community';
import { User } from './User';

@Entity()
export class CommunityMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user)
  user: Relation<User>;

  @ManyToOne(() => Community, (community) => community)
  community: Relation<Community>;
}
