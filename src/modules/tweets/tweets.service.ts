import { CreateTweetDto } from './dto/create-tweet.dto';
import { UserExceptions } from './../users/exceptions/user.exceptions';
import { TweetRO } from './interface/tweet.interface';
import { Tweet } from './tweets.entity';
import { User } from './../users/users.entity';
import { USER_EXCEPTIONS } from './../../common/errors/nest-errors';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, Validator } from 'class-validator';
import { Repository } from 'typeorm';
/**
 *
 *
 * @export
 * @class UsersService
 */
@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet) public readonly tweetRepository: Repository<Tweet>,
    @InjectRepository(User) public readonly userRepository: Repository<User>
  ) {}

  /**
   *
   *
   * @returns {Promise<Tweet[]>}
   * @memberof TweetService
   */
  async findAll(): Promise<Tweet[]> {
    return await this.tweetRepository.find({ relations: ['user'] });
  }
  /**
   *
   *
   * @param {number} userId
   * @returns {Promise<Tweet>}
   * @memberof TweetService
   */
  async findTweetsByUserId(userId: number): Promise<Tweet[]> {
    let userTweets = await this.userRepository.findOne(userId,{ 
        relations: ['tweets'] });
    return userTweets.tweets;
  }
 
/**
 *
 *
 * @param {CreateTweetDto} entry
 * @returns {Promise<TweetRO>}
 * @memberof TweetService
 */
async createTweet(entry: CreateTweetDto): Promise<TweetRO> {
    const { text, upload, slug,userId } = entry;

    let newTweet = new Tweet();
    newTweet = Object.assign(newTweet, entry);
    const errors=await validate(newTweet)

    if (errors.length > 0) {
        throw new UserExceptions(errors);
      }
   
    const savedTweet = await this.tweetRepository.save(newTweet);

    //save tweet to user--typeORM way of saving one to many relations
    let user= await this.userRepository.findOne(userId,{relations: ['tweets'] });
    if (Array.isArray(user.tweets)) {
        user.tweets.push(savedTweet);
      } else {
        user.tweets = [savedTweet];
      }
      let savedUser= await this.userRepository.save(user);

    return this.buildTweetRO(savedUser,savedTweet);
  }

 
/**
 *
 *
 * @param {number} tweetId
 * @returns
 * @memberof TweetService
 */
async deleteOne(tweetId: number) {
    let toDelete = await this.tweetRepository.findOne(tweetId);
    if (toDelete == undefined) {
      throw new UserExceptions(USER_EXCEPTIONS.UserDeletedError);
    }
    await this.tweetRepository.delete({ tweetId: tweetId });
    return toDelete;
  }

/**
 *
 *
 * @private
 * @param {User} user
 * @param {Tweet} tweet
 * @returns
 * @memberof TweetService
 */
private buildTweetRO(user: User,tweet:Tweet) {
    const tweetRO = {
      user: user,
      tweet: tweet,
    };

    return { tweet: tweetRO };
  }
}

