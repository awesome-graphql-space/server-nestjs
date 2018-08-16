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
import { IsEmail, Validate, IsString,MinLength } from 'class-validator';
import { Tweet } from './../tweets/tweets.entity';
import * as bcrypt from 'bcryptjs';
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

  @Column('varchar', {
    nullable: false,
    length: 191,
  })
  @IsEmail()
  email: string;
  
 
  @Column() 
  @MinLength(8)
  password: string;
  @BeforeInsert()
  async hashPassword() {
    this.password=  await bcrypt.hash(this.password, 10);
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
