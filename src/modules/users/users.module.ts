import { User } from './users.entity';
import { Tweet } from './../tweets/tweets.entity';
import { TweetsModule } from './../tweets/tweets.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolvers } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolvers],
  exports:[UsersService]
})
export class UsersModule {}
