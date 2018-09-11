import { IResolvers } from '../generated/resolvers';
import { Types } from './types';

import { Query } from './Query';
import { Mutation } from './Mutation';
import { Subscription } from './Subscription';
import { PackOfLies } from './PackOfLies';
import { AuthPayload } from './AuthPayload';
import { Tweet } from './Tweet';
import { User } from './User';

export const resolvers: IResolvers<Types> = {
  Query,
  Mutation,
  Subscription,
  PackOfLies,
  AuthPayload,
  Tweet,
  User,
};
