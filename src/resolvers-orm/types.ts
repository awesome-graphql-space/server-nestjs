import { ITypes } from '../generated/resolvers';

import { QueryRoot } from './Query';
import { MutationRoot } from './Mutation';
import { SubscriptionRoot } from './Subscription';
import { PackOfLiesRoot } from './PackOfLies';
import { AuthPayloadRoot } from './AuthPayload';
import { TweetRoot } from './Tweet';
import { UserRoot } from './User';

import { Context } from './Context';

export interface Types extends ITypes {
  Context: Context;
  QueryRoot: QueryRoot;
  MutationRoot: MutationRoot;
  SubscriptionRoot: SubscriptionRoot;
  PackOfLiesRoot: PackOfLiesRoot;
  AuthPayloadRoot: AuthPayloadRoot;
  TweetRoot: TweetRoot;
  UserRoot: UserRoot;
}
