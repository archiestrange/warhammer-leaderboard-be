import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
