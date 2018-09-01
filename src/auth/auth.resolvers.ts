/**
 * @fileOverview This file contain auth payload resolver and resolvers for authentication
 * @author Rex Raphael
 */
import {
  Mutation,
  Resolver,
  ResolveProperty,
} from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { getUser, jtwSecret, Context } from '../common/utils';
import { AuthService } from './auth.service';
import {
  PasswordTooShortError,
  MissingDataError,
  UserUsernameExistsError,
  UserNotFoundError,
  InvalidOldPasswordError,
} from '../common/apollo-errors';
import { JwtAuthPayload } from './interfaces/jwt-payload.interface';
import { IMutation } from '../generated/resolvers';
import { Types } from '../resolvers-orm/types';

/**
 * @description Generates the user jwt token for authentication
 * @param user takes the current user object from prisma
 * @param ctx accepts the apollo server context
 */
function generateToken(user: any, ctx: any) {
  return jwt.sign({ userId: user.id }, jtwSecret);
}

/**
 * @description this function validates the lenght of password
 * @param value password passed as string
 */
function validatePassword(value: string) {
  if (value.length <= 8) {
    throw new PasswordTooShortError();
  }
}

/**
 * @description get hashed value from a string password
 * @param value takes in a password
 */
function getHashedPassword(value: string) {
  return bcrypt.hash(value, 10);
}

/**
 * Auth resolver class
 */
@Resolver('AuthPayload')
export class AuthResolvers {
  constructor(
    private readonly authService: AuthService,
  ) { }

  // login mutation
  @Mutation()
  async login(obj, { username, password }: any, ctx: Context, info): Promise<JwtAuthPayload | any> {

    const userExist = await ctx.db.$exists.user({ username });
    if (!userExist) {
      throw new UserNotFoundError();
    }

    const user = await ctx.db.user({ username });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UserNotFoundError();
    }

    return {
      token: generateToken(user, ctx),
      user,
    };
  }

  // signup mutation
  @Mutation()
  signup: IMutation.SignupResolver<Types> = async (
    root,
    args,
    ctx,
  ) => {

    if (!args.username) {
      throw new MissingDataError();
    }

    const userExists = await ctx.db.$exists.user({ username: args.username });
    if (userExists) {
      throw new UserUsernameExistsError();
    }

    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.createUser({ ...args, password });

    validatePassword(args.password);

    return {
      token: generateToken(user, ctx),
      user,
    };
  }

  // change password mutation
  @Mutation()
  async changePassword(obj, { oldPassword, newPassword }: { oldPassword: string; newPassword: string }, context: Context, info): Promise<any> {
    const user = await getUser(context);

    const valid = await bcrypt.compare(user.password, oldPassword);
    if (!valid) {
      throw new InvalidOldPasswordError();
    }

    validatePassword(newPassword);
    const password = await getHashedPassword(newPassword);

    const newUser = await context.db.updateUser({
      where: { id: user.id },
      data: { password },
    });

    return {
      id: newUser!.id,
    };
  }

}
