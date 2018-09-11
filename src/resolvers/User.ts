import { IUser } from '../generated/resolvers';
import { Types } from './types';
import { TweetRoot } from './Tweet';

export interface UserRoot {
  id: string;
  password: string;
  username: string;
  displayName: string;
  tweets: TweetRoot[];
}

export const User: IUser.Resolver<Types> = {
  id: root => root.id,
  password: root => root.password,
  username: root => root.username,
  displayName: root => root.displayName,
  tweets: (root, args) => root.tweets,
};
