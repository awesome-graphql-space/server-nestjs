import { IQuery } from '../generated/resolvers';
import { Types } from './types';
import { Context, getUserId, getUser } from '../common/utils';

export interface QueryRoot {}

export const Query: IQuery.Resolver<Types> = {
  tweets: async (root, args, ctx) => {
    return ctx.db.tweets();
  },
  myTweets: async (root, args, ctx) => {
    const userId = getUserId(ctx);
    return ctx.db.tweets({
      where: {
        author: {
          id: userId,
        },
      }});
  },
  currentUser: async (root, args, ctx) => {
    return await getUser(ctx);
  },
};
