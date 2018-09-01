import { IMutation } from '../generated/resolvers';
import { Types } from './types';

export interface MutationRoot {}

export const Mutation: IMutation.Resolver<Types> = {
  signup: (root, args) => {
    throw new Error('Resolver not implemented');
  },
  login: (root, args) => {
    throw new Error('Resolver not implemented');
  },
  changePassword: (root, args) => {
    throw new Error('Resolver not implemented');
  },
  post: (root, args) => {
    throw new Error('Resolver not implemented');
  },
  deleteTweet: (root, args) => {
    throw new Error('Resolver not implemented');
  },
};
