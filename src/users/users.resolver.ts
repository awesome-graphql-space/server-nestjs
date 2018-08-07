import {
  Query,
  Mutation,
  Resolver,
  DelegateProperty,
  Subscription,
  ResolveProperty,
} from '@nestjs/graphql';

import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly userService: UsersService) { }
}
