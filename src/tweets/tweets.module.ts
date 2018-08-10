import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsResolvers } from './tweets.resolvers';
import { Tweet } from './tweet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  exports: [TweetsService],
  providers: [TweetsService, TweetsResolvers],
})
export class TweetsModule {}
