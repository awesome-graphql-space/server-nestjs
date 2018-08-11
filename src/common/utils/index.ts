import * as jwt from 'jsonwebtoken';
import { createError } from 'apollo-errors';
import { Prisma } from '../../generated/prisma';

// Prisma context interface for better code completeion
export interface Context {
  db: Prisma;
  request: any;
}

// Jwt secret
export const jtwSecret = 'KLSKDJUY$%@!&^&^@#!&^%!@$Vgdgsdf_()900*&%^$%#@@hf156176';

/**
 * @description This function gets the user id from jwt token
 * @param ctx takes the graphql context
 */
export function getUserId(ctx: any): string {
  const Authorization = ctx.headers.authorization;
  // tslint:disable-next-line:no-console
  console.log(Authorization);
  if (Authorization) {
    const token = Authorization.replace('Bearer ', jtwSecret);
    // tslint:disable-next-line:no-console
    console.log(token);
    const { userId } = jwt.verify(token, jtwSecret);
    // tslint:disable-next-line:no-console
    console.log(userId);
    return userId;
  }

  throw new Error('Not authourized');

}

/**
 * @description gets the current user object
 * @param ctx takes the graphql context
 */
export function getUser(ctx: any): Promise<any> {
  return ctx.db.query.user({ where: { id: getUserId(ctx) } });
}

/**
 * Simple apollo error for auth issues
 */
export const AuthError = createError('AuthError', {
  message: 'Not authourized.',
});