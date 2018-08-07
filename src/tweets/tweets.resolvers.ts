import {
  Query,
  Mutation,
  Resolver,
  DelegateProperty,
  Subscription,
  ResolveProperty,
} from '@nestjs/graphql';

import { TweetsService } from './tweets.service';

@Resolver('Tweet')
export class TweetsResolvers {
  constructor(private readonly userService: TweetsService) { }
}
