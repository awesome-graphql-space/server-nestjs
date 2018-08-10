import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Tweet } from 'tweets/tweet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 140 })
  displayName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne(type => Tweet, tweet => tweet.author)
  tweets: [Tweet];
}
