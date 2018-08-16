import { TweetRO } from './interface/tweet.interface';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweets.entity';
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
import { AuthGuard } from "@nestjs/passport";
import { TweetsService } from './tweets.service';
import { PubSub } from "graphql-subscriptions";
import { Component, UseGuards } from "@nestjs/common";
import * as jwtDecode from 'jwt-decode';
const pubsub = new PubSub();

/**
 * Tweet resolver
 */
@Resolver('Tweet')
export class TweetsResolvers {
  constructor(private readonly tweetService: TweetsService) { }

  /**
   * @description Post tweet mutation
   * @param obj this contains data of the current apollo type
   * @param param1 grapqhl request payload
   * @param ctx apollo server context
   * @param info apollo server info
   */
  @Mutation("postTweet")
  @UseGuards(AuthGuard('bearer'))
    async post(obj, args: CreateTweetDto, context, info): Promise<TweetRO> {
      const createdTweet = await this.tweetService.createTweet(args);
      pubsub.publish("tweetCreated", { tweetCreated: createdTweet });
      return createdTweet;
  }
  /**
   * @description tweet query
   * @param obj this contains data of the current apollo type
   * @param param1 grapqhl request payload
   * @param ctx apollo server context
   * @param info apollo server info
   */
  @Query("allTweets")
  @UseGuards(AuthGuard('bearer'))
  async tweets(obj, args: any, context, info):Promise<Tweet[]> {
    const allTweets = await this.tweetService.findAll();
    return allTweets;
  }

  /**
   * @description Get tweets authored by current user
   * @param obj this contains data of the current apollo type
   * @param param1 grapqhl request payload
   * @param ctx apollo server context
   * @param info apollo server info
   */
  @Query("signedInUsersTweets")
  @UseGuards(AuthGuard('bearer'))
  async myTweets(obj, args: any, context, info){
    let tokenData: any = jwtDecode(obj.headers.authorization);
    const allTweets = await this.tweetService.findTweetsByUserId(tokenData.userId);
  }

  @Subscription("tweetCreated")
  tweetCreated() {
    return {
      subscribe: () => pubsub.asyncIterator("tweetCreated")
    };
  }
 
}
