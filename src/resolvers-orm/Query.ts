import { IQuery } from '../generated/resolvers';
import { Types } from './types';

export interface QueryRoot {}

export const Query: IQuery.Resolver<Types> = {
  tweets: root => {
    throw new Error('Resolver not implemented');
  },
  myTweets: root => {
    throw new Error('Resolver not implemented');
  },
  currentUser: root => {
    throw new Error('Resolver not implemented');
  },
};
