import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { League } from './League';
import { User } from './User';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @ManyToOne(() => League, (league) => league, { nullable: true })
  league: Relation<League>;

  @ManyToOne(() => User, (user) => user, { nullable: true })
  attacker: Relation<User>;

  @ManyToOne(() => User, (user) => user, { nullable: true })
  defender: Relation<User>;

  @Column()
  attackerPoints: number;

  @Column()
  defenderPoints: number;

  @Column()
  attackerAveragePoints: number;

  @Column()
  defenderAveragePoints: number;

  @Column()
  attackerArmy: string;

  @Column()
  defenderArmy: string;

  @Column()
  score: string;

  @Column({ default: true })
  attackerHandshake: boolean;

  @Column({ default: true })
  defenderHandshake: boolean;

  @Column({ default: '' })
  attackerArmyDetail: string;

  @Column({ default: '' })
  defenderArmyDetail: string;

  @Column({ default: '' })
  round1Notes: string;

  @Column({ default: '' })
  round2Notes: string;

  @Column({ default: '' })
  round3Notes: string;

  @Column({ default: '' })
  round4Notes: string;

  @Column({ default: '' })
  round5Notes: string;

  @Column({ nullable: true, default: null })
  attackerTacticalPoints: number;

  @Column({ nullable: true, default: null })
  attackerFixedPoints: number;

  @Column({ nullable: true, default: null })
  defenderTacticalPoints: number;

  @Column({ nullable: true, default: null })
  defenderFixedPoints: number;
}
