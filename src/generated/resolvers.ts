import { GraphQLResolveInfo } from 'graphql';

export interface ResolverFn<Root, Args, Ctx, Payload> {
  (root: Root, args: Args, ctx: Ctx, info: GraphQLResolveInfo):
    | Payload
    | Promise<Payload>;
}

export interface ITypes {
  Context: any;
  TweetOrderByInput: any;

  QueryRoot: any;
  MutationRoot: any;
  SubscriptionRoot: any;
  PackOfLiesRoot: any;
  AuthPayloadRoot: any;
  TweetRoot: any;
  UserRoot: any;
}

export namespace IQuery {
  export type TweetsResolver<T extends ITypes> = ResolverFn<
    T['QueryRoot'],
    {},
    T['Context'],
    T['TweetRoot'][]
  >;

  export type MyTweetsResolver<T extends ITypes> = ResolverFn<
    T['QueryRoot'],
    {},
    T['Context'],
    T['TweetRoot'][]
  >;

  export type CurrentUserResolver<T extends ITypes> = ResolverFn<
    T['QueryRoot'],
    {},
    T['Context'],
    T['UserRoot']
  >;

  export interface Resolver<T extends ITypes> {
    tweets: TweetsResolver<T>;
    myTweets: MyTweetsResolver<T>;
    currentUser: CurrentUserResolver<T>;
  }
}

export namespace IMutation {
  export interface ArgsSignup {
    displayName: string;
    username: string;
    password: string;
  }

  export type SignupResolver<T extends ITypes> = ResolverFn<
    T['MutationRoot'],
    ArgsSignup,
    T['Context'],
    T['AuthPayloadRoot']
  >;

  export interface ArgsLogin {
    username: string;
    password: string;
  }

  export type LoginResolver<T extends ITypes> = ResolverFn<
    T['MutationRoot'],
    ArgsLogin,
    T['Context'],
    T['AuthPayloadRoot']
  >;

  export interface ArgsChangePassword {
    oldPassword: string;
    newPassword: string;
  }

  export type ChangePasswordResolver<T extends ITypes> = ResolverFn<
    T['MutationRoot'],
    ArgsChangePassword,
    T['Context'],
    T['TweetRoot']
  >;

  export interface ArgsPost {
    text: string;
    upload: string | null;
  }

  export type PostResolver<T extends ITypes> = ResolverFn<
    T['MutationRoot'],
    ArgsPost,
    T['Context'],
    T['TweetRoot']
  >;

  export interface ArgsDeleteTweet {
    id: string;
  }

  export type DeleteTweetResolver<T extends ITypes> = ResolverFn<
    T['MutationRoot'],
    ArgsDeleteTweet,
    T['Context'],
    T['TweetRoot']
  >;

  export interface Resolver<T extends ITypes> {
    signup: SignupResolver<T>;
    login: LoginResolver<T>;
    changePassword: ChangePasswordResolver<T>;
    post: PostResolver<T>;
    deleteTweet: DeleteTweetResolver<T>;
  }
}

export namespace ISubscription {
  export type TweetSubscriptionResolver<T extends ITypes> = ResolverFn<
    T['SubscriptionRoot'],
    {},
    T['Context'],
    T['PackOfLiesRoot'] | null
  >;

  export interface Resolver<T extends ITypes> {
    tweetSubscription: TweetSubscriptionResolver<T>;
  }
}

export namespace IPackOfLies {
  export type LiesResolver<T extends ITypes> = ResolverFn<
    T['PackOfLiesRoot'],
    {},
    T['Context'],
    string | null
  >;

  export type FakenessResolver<T extends ITypes> = ResolverFn<
    T['PackOfLiesRoot'],
    {},
    T['Context'],
    string | null
  >;

  export interface Resolver<T extends ITypes> {
    lies: LiesResolver<T>;
    fakeness: FakenessResolver<T>;
  }
}

export namespace IAuthPayload {
  export type TokenResolver<T extends ITypes> = ResolverFn<
    T['AuthPayloadRoot'],
    {},
    T['Context'],
    string
  >;

  export type UserResolver<T extends ITypes> = ResolverFn<
    T['AuthPayloadRoot'],
    {},
    T['Context'],
    T['UserRoot']
  >;

  export interface Resolver<T extends ITypes> {
    token: TokenResolver<T>;
    user: UserResolver<T>;
  }
}

export namespace ITweet {
  export type IdResolver<T extends ITypes> = ResolverFn<
    T['TweetRoot'],
    {},
    T['Context'],
    string
  >;

  export type TextResolver<T extends ITypes> = ResolverFn<
    T['TweetRoot'],
    {},
    T['Context'],
    string
  >;

  export type UploadResolver<T extends ITypes> = ResolverFn<
    T['TweetRoot'],
    {},
    T['Context'],
    string | null
  >;

  export type SlugResolver<T extends ITypes> = ResolverFn<
    T['TweetRoot'],
    {},
    T['Context'],
    string | null
  >;

  export type ViewsResolver<T extends ITypes> = ResolverFn<
    T['TweetRoot'],
    {},
    T['Context'],
    number | null
  >;

  export interface ArgsAuthor {
    where: T['UserWhereInputRoot'] | null;
  }

  export type AuthorResolver<T extends ITypes> = ResolverFn<
    T['TweetRoot'],
    ArgsAuthor,
    T['Context'],
    T['UserRoot']
  >;

  export interface Resolver<T extends ITypes> {
    id: IdResolver<T>;
    text: TextResolver<T>;
    upload: UploadResolver<T>;
    slug: SlugResolver<T>;
    views: ViewsResolver<T>;
    author: AuthorResolver<T>;
  }
}

export namespace IUser {
  export type IdResolver<T extends ITypes> = ResolverFn<
    T['UserRoot'],
    {},
    T['Context'],
    string
  >;

  export type PasswordResolver<T extends ITypes> = ResolverFn<
    T['UserRoot'],
    {},
    T['Context'],
    string
  >;

  export type UsernameResolver<T extends ITypes> = ResolverFn<
    T['UserRoot'],
    {},
    T['Context'],
    string
  >;

  export type DisplayNameResolver<T extends ITypes> = ResolverFn<
    T['UserRoot'],
    {},
    T['Context'],
    string
  >;

  export interface ArgsTweets {
    where: T['TweetWhereInputRoot'] | null;
    orderBy: T['TweetOrderByInput'] | null;
    skip: number | null;
    after: string | null;
    before: string | null;
    first: number | null;
    last: number | null;
  }

  export type TweetsResolver<T extends ITypes> = ResolverFn<
    T['UserRoot'],
    ArgsTweets,
    T['Context'],
    T['TweetRoot'][]
  >;

  export interface Resolver<T extends ITypes> {
    id: IdResolver<T>;
    password: PasswordResolver<T>;
    username: UsernameResolver<T>;
    displayName: DisplayNameResolver<T>;
    tweets: TweetsResolver<T>;
  }
}

export interface IResolvers<T extends ITypes> {
  Query: IQuery.Resolver<T>;
  Mutation: IMutation.Resolver<T>;
  Subscription: ISubscription.Resolver<T>;
  PackOfLies: IPackOfLies.Resolver<T>;
  AuthPayload: IAuthPayload.Resolver<T>;
  Tweet: ITweet.Resolver<T>;
  User: IUser.Resolver<T>;
}
