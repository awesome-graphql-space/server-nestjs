import {
  Query,
  Mutation,
  Resolver,
  DelegateProperty,
  Subscription,
  ResolveProperty,
} from '@nestjs/graphql';
import { getUser, Context } from '../common/utils';
import { TweetsService } from './tweets.service';

@Resolver('Tweet')
export class TweetsResolvers {
  constructor(private readonly userService: TweetsService) { }

  @Mutation()
  async post(obj, {text, upload}: any, ctx: Context, info): Promise<JwtAuthPayload | any> {
    return null;
  }

  @Query()
  async tweets(obj, {text, upload}: any, ctx: Context, info): Promise<JwtAuthPayload | any> {
    return null;
  }

  @Query()
  async myTweets(obj, {text, upload}: any, ctx: Context, info): Promise<JwtAuthPayload | any> {
    return null;
  }

  @Query()
  tweetSubscription (parent, args, ctx: Context, info) {
    return ctx.db.subscription.tweet({}, info);
  },
}
