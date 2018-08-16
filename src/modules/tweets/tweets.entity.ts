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
import { User } from './../users/users.entity';
/**
 *TypeOrm Class for the Tweet maps to Tweet table in mysql db
 *
 * @export
 * @class Tweet
 */
@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  tweetId: number;

  @Column('varchar', {
    nullable: false,
    length: 191,
  })
  text: string;

  @Column('varchar', {
    nullable: true,
    length: 191,
  })
  upload: string;

  @Column('varchar', {
    nullable: true,
    length: 191,
    unique: true,
  })
  slug: string;

  @Column({ type: 'int',nullable: true, })
  views: number;

  @ManyToOne(type => User, user => user.tweets, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
