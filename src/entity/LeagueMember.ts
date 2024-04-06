import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { League } from './League';
import { User } from './User';

@Entity()
export class LeagueMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column({ default: 400 })
  leagueRanking: number;

  @ManyToOne(() => User, (user) => user)
  user: Relation<User>;

  @ManyToOne(() => League, (league) => league)
  league: Relation<League>;
}
