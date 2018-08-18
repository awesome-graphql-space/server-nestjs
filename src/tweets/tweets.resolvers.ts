/**
 * @fileOverview This file contain tweet payload resolver and resolvers for tweet
 * @author Rex Raphael
 */
import {
  Query,
  Mutation,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server';
import { Context, getUserId } from '../common/utils';
import { TweetsService } from './tweets.service';
import { NotAuthenticatedError } from '../common/apollo-errors';

const pubsub = new PubSub();

/**
 * Tweet resolver
 */
@Resolver('Tweet')
export class TweetsResolvers {
  constructor(private readonly userService: TweetsService) { }

  /**
   * @description Post tweet mutation
   * @param obj this contains data of the current apollo type
   * @param param1 grapqhl request payload
   * @param ctx apollo server context
   * @param info apollo server info
   */
  @Mutation()
  post(obj, {text, upload}: any, ctx: Context, info){
    const userId = getUserId(ctx);

    if (!userId) throw NotAuthenticatedError;

    const tweet = ctx.db.mutation.createTweet({
      data: {
        author: {
          connect: {
            id: userId,
          },
        },
        text,
        upload,
      },
    });
    pubsub.publish('DEAD_FISH', {lies: 'too many', fakeness: 'high'});
    return tweet;
  }

  /**
   * @description tweet query
   * @param obj this contains data of the current apollo type
   * @param param1 grapqhl request payload
   * @param ctx apollo server context
   * @param info apollo server info
   */
  @Query()
  async tweets(obj, args: any, ctx: Context, info) {
    return await ctx.db.query.tweets({orderBy: 'createdAt_DESC'}, info);
  }

  /**
   * @description Get tweets authored by current user
   * @param obj this contains data of the current apollo type
   * @param param1 grapqhl request payload
   * @param ctx apollo server context
   * @param info apollo server info
   */
  @Query()
  async myTweets(obj, args: any, ctx: Context, info){
    const userId = getUserId(ctx);
    if (!userId) throw NotAuthenticatedError;
    return await ctx.db.query.tweets({
      where: {
        author: {
          id: userId,
        },
      },
    }, info);
  }

  /**
   * @param obj Subscription support for tweets
   * @param args
   * @param ctx takes in the apollo and prisma context
   * @param info
   */
  @Subscription()
  async tweetSubscription(obj, args: any, ctx: Context, info){
    ///const prismaRes = await ctx.db.subscription.tweet({}, info);
    return await pubsub.asyncIterator('DEAD_FISH');
  }
}