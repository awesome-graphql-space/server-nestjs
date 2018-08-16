import { UsersModule } from './../users/users.module';
import { Tweet } from './tweets.entity';
import { User } from './../users/users.entity';
import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsResolvers } from './tweets.resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TweetsService, TweetsResolvers],

  imports:[TypeOrmModule.forFeature([Tweet,User]),UsersModule],
  exports:[TweetsService]
})
export class TweetsModule {}
