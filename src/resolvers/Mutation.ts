import { IMutation } from '../generated/resolvers';
import { Types } from './types';
import { NotAuthenticatedError, UserNotFoundError, PasswordTooShortError, MissingDataError, UserUsernameExistsError } from 'common/apollo-errors';
import { getUserId, jtwSecret } from '../common/utils';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

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

export interface MutationRoot {}

export const Mutation: IMutation.Resolver<Types> = {
  signup: async (root, args, ctx) => {
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
  },
  login: async (root, { username, password }, ctx) => {
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
  },
  changePassword: (root, args) => {
    throw new Error('Resolver not implemented');
  },
  post: (root, {text, upload}, ctx) => {
    const userId = getUserId(ctx);

    if (!userId) throw NotAuthenticatedError;

    const tweet = ctx.db.createTweet({
      author: {
        connect: {
          id: userId,
        },
      },
      text,
      upload,
    });

    return tweet;
  },
  deleteTweet: (root, args) => {
    throw new Error('Resolver not implemented');
  },
};
