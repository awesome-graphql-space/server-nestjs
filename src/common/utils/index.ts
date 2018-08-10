import * as jwt from 'jsonwebtoken';
import { createError } from 'apollo-errors';


// Prisma context interface for better code completeion
export interface Context {
  request: any;
}

// Jwt secret
export const jtwSecret = 'KLSKDJUY$%@!&^&^@#!&^%!@$Vgdgsdf_()900*&%^$%#@@hf156176';

/**
 * @description This function gets the user id from jwt token
 * @param ctx takes the graphql context
 */
export function getUserId(ctx: any): string {
  const Authorization = ctx.req.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', jtwSecret);
    const { userId } = jwt.verify(token, jtwSecret) as {
      userId: string;
    };
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