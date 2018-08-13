import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as crypto from 'crypto';
import { IsEmail, Validate, IsString } from 'class-validator';
import { Tweet } from './../tweets/tweets.entity';
/**
 *TypeOrm Class for the User maps to User table in mysql db
 *
 * @export
 * @class User
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    nullable: false,
    length: 191,
  })
  password: string;
  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column('varchar', {
    nullable: false,
    length: 191,
  })
  username: string;

  @Column('varchar', {
    nullable: false,
    length: 191,
  })
  displayName: string;

  @OneToMany(type => Tweet, tweet => tweet.user)
  tweets: Tweet[];
}
