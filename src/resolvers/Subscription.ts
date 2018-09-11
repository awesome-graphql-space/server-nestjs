import { ISubscription } from '../generated/resolvers';
import { Types } from './types';

export interface SubscriptionRoot {}

export const Subscription: ISubscription.Resolver<Types> = {
  tweetSubscription: root => null,
};
