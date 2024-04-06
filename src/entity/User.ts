import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: '' })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  winStreak: number;

  @Column()
  maxWinStreak: number;

  @Column({ default: 400 })
  globalRanking: number;
}
