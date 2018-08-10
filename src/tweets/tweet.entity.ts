import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from 'users/user.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @Column()
  upload: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  views: number;

  @OneToMany(type => User, user => user.tweets)
  author: User;
}
