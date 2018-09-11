import { ITweet } from '../generated/resolvers';
import { Types } from './types';
import { UserRoot } from './User';

export interface TweetRoot {
  id: string;
  text: string;
  upload?: string;
  slug?: string;
  views?: number;
  author: UserRoot;
}

export const Tweet: ITweet.Resolver<Types> = {
  id: root => root.id,
  text: root => root.text,
  upload: root => root.upload,
  slug: root => root.slug,
  views: root => root.views,
  author: (root, args) => root.author,
};
