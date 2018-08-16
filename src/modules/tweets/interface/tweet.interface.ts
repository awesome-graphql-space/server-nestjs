import { Tweet } from './../tweets.entity';
import { User } from './../../users/users.entity';
/**
 *
 *
 * @export
 * @interface TweetData
 */
export interface TweetData {
  text?: string;
  upload?: string;
  slug?: string;
  userId?: number;
  tweet:Tweet;
  user:User;
}

export interface TweetRO{
    tweet:TweetData
}
