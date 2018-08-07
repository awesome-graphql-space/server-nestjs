import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsResolvers } from './tweets.resolvers';

@Module({
  providers: [TweetsService, TweetsResolvers],
})
export class TweetsModule {}
