import {
  Query,
  Mutation,
  Resolver,
  DelegateProperty,
  Subscription,
  ResolveProperty,
} from '@nestjs/graphql';
import { getUser, Context } from '../common/utils';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly userService: UsersService) { }

  @Query()
  async currentUser(obj, {text, upload}: any, ctx: Context, info): Promise<User | any> {
    return await getUser(ctx);
  }
}
