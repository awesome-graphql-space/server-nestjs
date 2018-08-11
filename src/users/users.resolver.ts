/**
 * @fileOverview This file contain user payload resolver and resolvers for user
 * @author Rex Raphael
 */
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

/**
 * User resolver
 */
@Resolver('User')
export class UsersResolvers {
  constructor(private readonly userService: UsersService) { }

  /**
   * @description current user query
   * @param obj this contains data of the current apollo type
   * @param param1 grapqhl request payload
   * @param ctx apollo server context
   * @param info apollo server info
   */
  @Query()
  async currentUser(obj, args: any, ctx: Context, info): Promise<User | any> {
    return await getUser(ctx);
  }
}
