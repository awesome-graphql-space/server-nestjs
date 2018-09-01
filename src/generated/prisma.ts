import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { makePrismaBindingClass, BasePrismaOptions, Options } from 'prisma-lib'

export interface Exists {
  user: (where?: UserWhereInput) => Promise<boolean>
  tweet: (where?: TweetWhereInput) => Promise<boolean>
}

export interface Node { }

export interface Prisma {
  $exists: Exists;
  $request: <T = any>(query: string, variables?: { [key: string]: any }) => Promise<T>;
  $delegate: Delegate;
  $getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;

  /**
   * Queries
  */

  users: (args?: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<UserNode>>;
  tweets: (args?: { where?: TweetWhereInput, orderBy?: TweetOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<TweetNode>>;
  user: (where: UserWhereUniqueInput) => User;
  tweet: (where: TweetWhereUniqueInput) => Tweet;
  usersConnection: (args?: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => UserConnection;
  tweetsConnection: (args?: { where?: TweetWhereInput, orderBy?: TweetOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => TweetConnection;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
  */

  createUser: (data: UserCreateInput) => User;
  createTweet: (data: TweetCreateInput) => Tweet;
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }) => User;
  updateTweet: (args: { data: TweetUpdateInput, where: TweetWhereUniqueInput }) => Tweet;
  deleteUser: (where: UserWhereUniqueInput) => User;
  deleteTweet: (where: TweetWhereUniqueInput) => Tweet;
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }) => User;
  upsertTweet: (args: { where: TweetWhereUniqueInput, create: TweetCreateInput, update: TweetUpdateInput }) => Tweet;
  updateManyUsers: (args: { data: UserUpdateInput, where?: UserWhereInput }) => BatchPayload;
  updateManyTweets: (args: { data: TweetUpdateInput, where?: TweetWhereInput }) => BatchPayload;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayload;
  deleteManyTweets: (where?: TweetWhereInput) => BatchPayload;
}

export interface Delegate {
  (
    operation: 'query' | 'mutation',
    fieldName: string,
    args: {
      [key: string]: any
    },
    infoOrQuery?: GraphQLResolveInfo,
    options?: Options,
  ): Promise<any>
  query: DelegateQuery
  mutation: DelegateMutation
}

export interface DelegateQuery {
  users: <T = Promise<Array<UserNode>>>(args?: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int, info?: GraphQLResolveInfo, options?: Options }) => T;
  tweets: <T = Promise<Array<TweetNode>>>(args?: { where?: TweetWhereInput, orderBy?: TweetOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int, info?: GraphQLResolveInfo, options?: Options }) => T;
  user: <T = Promise<Partial<UserNode | null>>>(where: UserWhereUniqueInput) => T;
  tweet: <T = Promise<Partial<TweetNode | null>>>(where: TweetWhereUniqueInput) => T;
  usersConnection: <T = Promise<Partial<UserConnectionNode>>>(args?: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int, info?: GraphQLResolveInfo, options?: Options }) => T;
  tweetsConnection: <T = Promise<Partial<TweetConnectionNode>>>(args?: { where?: TweetWhereInput, orderBy?: TweetOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int, info?: GraphQLResolveInfo, options?: Options }) => T;
  node: <T = Promise<Partial<NodeNode | null>>>(args: { id: ID_Output, info?: GraphQLResolveInfo, options?: Options }) => T
}

export interface DelegateMutation {
  createUser: <T = Promise<Partial<UserNode>>>(where: UserCreateInput) => T;
  createTweet: <T = Promise<Partial<TweetNode>>>(where: TweetCreateInput) => T;
  updateUser: <T = Promise<Partial<UserNode | null>>>(args: { data: UserUpdateInput, where: UserWhereUniqueInput, info?: GraphQLResolveInfo, options?: Options }) => T;
  updateTweet: <T = Promise<Partial<TweetNode | null>>>(args: { data: TweetUpdateInput, where: TweetWhereUniqueInput, info?: GraphQLResolveInfo, options?: Options }) => T;
  deleteUser: <T = Promise<Partial<UserNode | null>>>(where: UserWhereUniqueInput) => T;
  deleteTweet: <T = Promise<Partial<TweetNode | null>>>(where: TweetWhereUniqueInput) => T;
  upsertUser: <T = Promise<Partial<UserNode>>>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput, info?: GraphQLResolveInfo, options?: Options }) => T;
  upsertTweet: <T = Promise<Partial<TweetNode>>>(args: { where: TweetWhereUniqueInput, create: TweetCreateInput, update: TweetUpdateInput, info?: GraphQLResolveInfo, options?: Options }) => T;
  updateManyUsers: <T = Promise<Partial<BatchPayloadNode>>>(args: { data: UserUpdateInput, where?: UserWhereInput, info?: GraphQLResolveInfo, options?: Options }) => T;
  updateManyTweets: <T = Promise<Partial<BatchPayloadNode>>>(args: { data: TweetUpdateInput, where?: TweetWhereInput, info?: GraphQLResolveInfo, options?: Options }) => T;
  deleteManyUsers: <T = Promise<Partial<BatchPayloadNode>>>(where?: UserWhereInput) => T;
  deleteManyTweets: <T = Promise<Partial<BatchPayloadNode>>>(where?: TweetWhereInput) => T;
}

export interface BindingConstructor<T> {
  new(options?: BasePrismaOptions): T
}

/**
 * Types
*/

export type UserOrderByInput = 'id_ASC' |
  'id_DESC' |
  'password_ASC' |
  'password_DESC' |
  'username_ASC' |
  'username_DESC' |
  'displayName_ASC' |
  'displayName_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type TweetOrderByInput = 'id_ASC' |
  'id_DESC' |
  'text_ASC' |
  'text_DESC' |
  'upload_ASC' |
  'upload_DESC' |
  'slug_ASC' |
  'slug_DESC' |
  'views_ASC' |
  'views_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType = 'CREATED' |
  'UPDATED' |
  'DELETED'

export interface TweetCreateWithoutAuthorInput {
  text: String
  upload?: String
  slug?: String
  views?: Int
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  username?: String
  username_not?: String
  username_in?: String[] | String
  username_not_in?: String[] | String
  username_lt?: String
  username_lte?: String
  username_gt?: String
  username_gte?: String
  username_contains?: String
  username_not_contains?: String
  username_starts_with?: String
  username_not_starts_with?: String
  username_ends_with?: String
  username_not_ends_with?: String
  displayName?: String
  displayName_not?: String
  displayName_in?: String[] | String
  displayName_not_in?: String[] | String
  displayName_lt?: String
  displayName_lte?: String
  displayName_gt?: String
  displayName_gte?: String
  displayName_contains?: String
  displayName_not_contains?: String
  displayName_starts_with?: String
  displayName_not_starts_with?: String
  displayName_ends_with?: String
  displayName_not_ends_with?: String
  tweets_every?: TweetWhereInput
  tweets_some?: TweetWhereInput
  tweets_none?: TweetWhereInput
}

export interface TweetUpdateInput {
  text?: String
  upload?: String
  slug?: String
  views?: Int
  author?: UserUpdateOneWithoutTweetsInput
}

export interface UserCreateWithoutTweetsInput {
  password: String
  username: String
  displayName: String
}

export interface TweetUpsertWithWhereUniqueWithoutAuthorInput {
  where: TweetWhereUniqueInput
  update: TweetUpdateWithoutAuthorDataInput
  create: TweetCreateWithoutAuthorInput
}

export interface UserCreateOneWithoutTweetsInput {
  create?: UserCreateWithoutTweetsInput
  connect?: UserWhereUniqueInput
}

export interface TweetUpdateWithoutAuthorDataInput {
  text?: String
  upload?: String
  slug?: String
  views?: Int
}

export interface TweetWhereInput {
  AND?: TweetWhereInput[] | TweetWhereInput
  OR?: TweetWhereInput[] | TweetWhereInput
  NOT?: TweetWhereInput[] | TweetWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  text?: String
  text_not?: String
  text_in?: String[] | String
  text_not_in?: String[] | String
  text_lt?: String
  text_lte?: String
  text_gt?: String
  text_gte?: String
  text_contains?: String
  text_not_contains?: String
  text_starts_with?: String
  text_not_starts_with?: String
  text_ends_with?: String
  text_not_ends_with?: String
  upload?: String
  upload_not?: String
  upload_in?: String[] | String
  upload_not_in?: String[] | String
  upload_lt?: String
  upload_lte?: String
  upload_gt?: String
  upload_gte?: String
  upload_contains?: String
  upload_not_contains?: String
  upload_starts_with?: String
  upload_not_starts_with?: String
  upload_ends_with?: String
  upload_not_ends_with?: String
  slug?: String
  slug_not?: String
  slug_in?: String[] | String
  slug_not_in?: String[] | String
  slug_lt?: String
  slug_lte?: String
  slug_gt?: String
  slug_gte?: String
  slug_contains?: String
  slug_not_contains?: String
  slug_starts_with?: String
  slug_not_starts_with?: String
  slug_ends_with?: String
  slug_not_ends_with?: String
  views?: Int
  views_not?: Int
  views_in?: Int[] | Int
  views_not_in?: Int[] | Int
  views_lt?: Int
  views_lte?: Int
  views_gt?: Int
  views_gte?: Int
  author?: UserWhereInput
}

export interface TweetUpdateWithWhereUniqueWithoutAuthorInput {
  where: TweetWhereUniqueInput
  data: TweetUpdateWithoutAuthorDataInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  username?: String
}

export interface UserCreateInput {
  password: String
  username: String
  displayName: String
  tweets?: TweetCreateManyWithoutAuthorInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface UserUpdateWithoutTweetsDataInput {
  password?: String
  username?: String
  displayName?: String
}

export interface UserUpdateInput {
  password?: String
  username?: String
  displayName?: String
  tweets?: TweetUpdateManyWithoutAuthorInput
}

export interface TweetCreateInput {
  text: String
  upload?: String
  slug?: String
  views?: Int
  author: UserCreateOneWithoutTweetsInput
}

export interface TweetUpdateManyWithoutAuthorInput {
  create?: TweetCreateWithoutAuthorInput[] | TweetCreateWithoutAuthorInput
  connect?: TweetWhereUniqueInput[] | TweetWhereUniqueInput
  disconnect?: TweetWhereUniqueInput[] | TweetWhereUniqueInput
  delete?: TweetWhereUniqueInput[] | TweetWhereUniqueInput
  update?: TweetUpdateWithWhereUniqueWithoutAuthorInput[] | TweetUpdateWithWhereUniqueWithoutAuthorInput
  upsert?: TweetUpsertWithWhereUniqueWithoutAuthorInput[] | TweetUpsertWithWhereUniqueWithoutAuthorInput
}

export interface TweetCreateManyWithoutAuthorInput {
  create?: TweetCreateWithoutAuthorInput[] | TweetCreateWithoutAuthorInput
  connect?: TweetWhereUniqueInput[] | TweetWhereUniqueInput
}

export interface UserUpdateOneWithoutTweetsInput {
  create?: UserCreateWithoutTweetsInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutTweetsDataInput
  upsert?: UserUpsertWithoutTweetsInput
}

export interface UserUpsertWithoutTweetsInput {
  update: UserUpdateWithoutTweetsDataInput
  create: UserCreateWithoutTweetsInput
}

export interface TweetWhereUniqueInput {
  id?: ID_Input
  slug?: String
}

export interface TweetSubscriptionWhereInput {
  AND?: TweetSubscriptionWhereInput[] | TweetSubscriptionWhereInput
  OR?: TweetSubscriptionWhereInput[] | TweetSubscriptionWhereInput
  NOT?: TweetSubscriptionWhereInput[] | TweetSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TweetWhereInput
}

/*
 * An object with an ID

 */
export interface NodeNode {
  id: ID_Output
}

export interface TweetPreviousValuesNode {
  id: ID_Output
  text: String
  upload?: String
  slug?: String
  views?: Int
}

export interface TweetPreviousValues extends Promise<TweetPreviousValuesNode> {
  id: () => Promise<ID_Output>
  text: () => Promise<String>
  upload: () => Promise<String>
  slug: () => Promise<String>
  views: () => Promise<Int>
}

export interface BatchPayloadNode {
  count: Long
}

export interface BatchPayload extends Promise<BatchPayloadNode> {
  count: () => Promise<Long>
}

export interface UserNode extends Node {
  id: ID_Output
  password: String
  username: String
  displayName: String
}

export interface User extends Promise<UserNode>, Node {
  id: () => Promise<ID_Output>
  password: () => Promise<String>
  username: () => Promise<String>
  displayName: () => Promise<String>
  tweets: (args?: { where?: TweetWhereInput, orderBy?: TweetOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<TweetNode>>
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfoNode {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo extends Promise<PageInfoNode> {
  hasNextPage: () => Promise<Boolean>
  hasPreviousPage: () => Promise<Boolean>
  startCursor: () => Promise<String>
  endCursor: () => Promise<String>
}

export interface UserSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String[]
}

export interface UserSubscriptionPayload extends Promise<UserSubscriptionPayloadNode> {
  mutation: () => Promise<MutationType>
  node: () => User
  updatedFields: () => Promise<String[]>
  previousValues: () => UserPreviousValues
}

export interface AggregateTweetNode {
  count: Int
}

export interface AggregateTweet extends Promise<AggregateTweetNode> {
  count: () => Promise<Int>
}

export interface UserPreviousValuesNode {
  id: ID_Output
  password: String
  username: String
  displayName: String
}

export interface UserPreviousValues extends Promise<UserPreviousValuesNode> {
  id: () => Promise<ID_Output>
  password: () => Promise<String>
  username: () => Promise<String>
  displayName: () => Promise<String>
}

/*
 * A connection to a list of items.

 */
export interface UserConnectionNode {

}

/*
 * A connection to a list of items.

 */
export interface UserConnection extends Promise<UserConnectionNode> {
  pageInfo: () => PageInfo
  edges: () => Promise<Array<UserEdgeNode>>
  aggregate: () => AggregateUser
}

/*
 * An edge in a connection.

 */
export interface TweetEdgeNode {
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface TweetEdge extends Promise<TweetEdgeNode> {
  node: () => Tweet
  cursor: () => Promise<String>
}

export interface TweetNode extends Node {
  id: ID_Output
  text: String
  upload?: String
  slug?: String
  views?: Int
}

export interface Tweet extends Promise<TweetNode>, Node {
  id: () => Promise<ID_Output>
  text: () => Promise<String>
  upload: () => Promise<String>
  slug: () => Promise<String>
  views: () => Promise<Int>
  author: (args?: { where?: UserWhereInput }) => User
}

/*
 * A connection to a list of items.

 */
export interface TweetConnectionNode {

}

/*
 * A connection to a list of items.

 */
export interface TweetConnection extends Promise<TweetConnectionNode> {
  pageInfo: () => PageInfo
  edges: () => Promise<Array<TweetEdgeNode>>
  aggregate: () => AggregateTweet
}

export interface TweetSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String[]
}

export interface TweetSubscriptionPayload extends Promise<TweetSubscriptionPayloadNode> {
  mutation: () => Promise<MutationType>
  node: () => Tweet
  updatedFields: () => Promise<String[]>
  previousValues: () => TweetPreviousValues
}

/*
 * An edge in a connection.

 */
export interface UserEdgeNode {
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface UserEdge extends Promise<UserEdgeNode> {
  node: () => User
  cursor: () => Promise<String>
}

export interface AggregateUserNode {
  count: Int
}

export interface AggregateUser extends Promise<AggregateUserNode> {
  count: () => Promise<Int>
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/**
 * Type Defs
*/

const typeDefs = `type AggregateTweet {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  createTweet(data: TweetCreateInput!): Tweet!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateTweet(data: TweetUpdateInput!, where: TweetWhereUniqueInput!): Tweet
  deleteUser(where: UserWhereUniqueInput!): User
  deleteTweet(where: TweetWhereUniqueInput!): Tweet
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertTweet(where: TweetWhereUniqueInput!, create: TweetCreateInput!, update: TweetUpdateInput!): Tweet!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyTweets(data: TweetUpdateInput!, where: TweetWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyTweets(where: TweetWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  tweets(where: TweetWhereInput, orderBy: TweetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tweet]!
  user(where: UserWhereUniqueInput!): User
  tweet(where: TweetWhereUniqueInput!): Tweet
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  tweetsConnection(where: TweetWhereInput, orderBy: TweetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TweetConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  tweet(where: TweetSubscriptionWhereInput): TweetSubscriptionPayload
}

type Tweet implements Node {
  id: ID!
  text: String!
  upload: String
  slug: String
  views: Int
  author(where: UserWhereInput): User!
}

"""A connection to a list of items."""
type TweetConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TweetEdge]!
  aggregate: AggregateTweet!
}

input TweetCreateInput {
  text: String!
  upload: String
  slug: String
  views: Int
  author: UserCreateOneWithoutTweetsInput!
}

input TweetCreateManyWithoutAuthorInput {
  create: [TweetCreateWithoutAuthorInput!]
  connect: [TweetWhereUniqueInput!]
}

input TweetCreateWithoutAuthorInput {
  text: String!
  upload: String
  slug: String
  views: Int
}

"""An edge in a connection."""
type TweetEdge {
  """The item at the end of the edge."""
  node: Tweet!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TweetOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  upload_ASC
  upload_DESC
  slug_ASC
  slug_DESC
  views_ASC
  views_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TweetPreviousValues {
  id: ID!
  text: String!
  upload: String
  slug: String
  views: Int
}

type TweetSubscriptionPayload {
  mutation: MutationType!
  node: Tweet
  updatedFields: [String!]
  previousValues: TweetPreviousValues
}

input TweetSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TweetSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TweetSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TweetSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TweetWhereInput
}

input TweetUpdateInput {
  text: String
  upload: String
  slug: String
  views: Int
  author: UserUpdateOneWithoutTweetsInput
}

input TweetUpdateManyWithoutAuthorInput {
  create: [TweetCreateWithoutAuthorInput!]
  connect: [TweetWhereUniqueInput!]
  disconnect: [TweetWhereUniqueInput!]
  delete: [TweetWhereUniqueInput!]
  update: [TweetUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [TweetUpsertWithWhereUniqueWithoutAuthorInput!]
}

input TweetUpdateWithoutAuthorDataInput {
  text: String
  upload: String
  slug: String
  views: Int
}

input TweetUpdateWithWhereUniqueWithoutAuthorInput {
  where: TweetWhereUniqueInput!
  data: TweetUpdateWithoutAuthorDataInput!
}

input TweetUpsertWithWhereUniqueWithoutAuthorInput {
  where: TweetWhereUniqueInput!
  update: TweetUpdateWithoutAuthorDataInput!
  create: TweetCreateWithoutAuthorInput!
}

input TweetWhereInput {
  """Logical AND on all given filters."""
  AND: [TweetWhereInput!]

  """Logical OR on all given filters."""
  OR: [TweetWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TweetWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  text: String

  """All values that are not equal to given value."""
  text_not: String

  """All values that are contained in given list."""
  text_in: [String!]

  """All values that are not contained in given list."""
  text_not_in: [String!]

  """All values less than the given value."""
  text_lt: String

  """All values less than or equal the given value."""
  text_lte: String

  """All values greater than the given value."""
  text_gt: String

  """All values greater than or equal the given value."""
  text_gte: String

  """All values containing the given string."""
  text_contains: String

  """All values not containing the given string."""
  text_not_contains: String

  """All values starting with the given string."""
  text_starts_with: String

  """All values not starting with the given string."""
  text_not_starts_with: String

  """All values ending with the given string."""
  text_ends_with: String

  """All values not ending with the given string."""
  text_not_ends_with: String
  upload: String

  """All values that are not equal to given value."""
  upload_not: String

  """All values that are contained in given list."""
  upload_in: [String!]

  """All values that are not contained in given list."""
  upload_not_in: [String!]

  """All values less than the given value."""
  upload_lt: String

  """All values less than or equal the given value."""
  upload_lte: String

  """All values greater than the given value."""
  upload_gt: String

  """All values greater than or equal the given value."""
  upload_gte: String

  """All values containing the given string."""
  upload_contains: String

  """All values not containing the given string."""
  upload_not_contains: String

  """All values starting with the given string."""
  upload_starts_with: String

  """All values not starting with the given string."""
  upload_not_starts_with: String

  """All values ending with the given string."""
  upload_ends_with: String

  """All values not ending with the given string."""
  upload_not_ends_with: String
  slug: String

  """All values that are not equal to given value."""
  slug_not: String

  """All values that are contained in given list."""
  slug_in: [String!]

  """All values that are not contained in given list."""
  slug_not_in: [String!]

  """All values less than the given value."""
  slug_lt: String

  """All values less than or equal the given value."""
  slug_lte: String

  """All values greater than the given value."""
  slug_gt: String

  """All values greater than or equal the given value."""
  slug_gte: String

  """All values containing the given string."""
  slug_contains: String

  """All values not containing the given string."""
  slug_not_contains: String

  """All values starting with the given string."""
  slug_starts_with: String

  """All values not starting with the given string."""
  slug_not_starts_with: String

  """All values ending with the given string."""
  slug_ends_with: String

  """All values not ending with the given string."""
  slug_not_ends_with: String
  views: Int

  """All values that are not equal to given value."""
  views_not: Int

  """All values that are contained in given list."""
  views_in: [Int!]

  """All values that are not contained in given list."""
  views_not_in: [Int!]

  """All values less than the given value."""
  views_lt: Int

  """All values less than or equal the given value."""
  views_lte: Int

  """All values greater than the given value."""
  views_gt: Int

  """All values greater than or equal the given value."""
  views_gte: Int
  author: UserWhereInput
}

input TweetWhereUniqueInput {
  id: ID
  slug: String
}

type User implements Node {
  id: ID!
  password: String!
  username: String!
  displayName: String!
  tweets(where: TweetWhereInput, orderBy: TweetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tweet!]
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  password: String!
  username: String!
  displayName: String!
  tweets: TweetCreateManyWithoutAuthorInput
}

input UserCreateOneWithoutTweetsInput {
  create: UserCreateWithoutTweetsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTweetsInput {
  password: String!
  username: String!
  displayName: String!
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  password_ASC
  password_DESC
  username_ASC
  username_DESC
  displayName_ASC
  displayName_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  password: String!
  username: String!
  displayName: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  password: String
  username: String
  displayName: String
  tweets: TweetUpdateManyWithoutAuthorInput
}

input UserUpdateOneWithoutTweetsInput {
  create: UserCreateWithoutTweetsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutTweetsDataInput
  upsert: UserUpsertWithoutTweetsInput
}

input UserUpdateWithoutTweetsDataInput {
  password: String
  username: String
  displayName: String
}

input UserUpsertWithoutTweetsInput {
  update: UserUpdateWithoutTweetsDataInput!
  create: UserCreateWithoutTweetsInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  password: String

  """All values that are not equal to given value."""
  password_not: String

  """All values that are contained in given list."""
  password_in: [String!]

  """All values that are not contained in given list."""
  password_not_in: [String!]

  """All values less than the given value."""
  password_lt: String

  """All values less than or equal the given value."""
  password_lte: String

  """All values greater than the given value."""
  password_gt: String

  """All values greater than or equal the given value."""
  password_gte: String

  """All values containing the given string."""
  password_contains: String

  """All values not containing the given string."""
  password_not_contains: String

  """All values starting with the given string."""
  password_starts_with: String

  """All values not starting with the given string."""
  password_not_starts_with: String

  """All values ending with the given string."""
  password_ends_with: String

  """All values not ending with the given string."""
  password_not_ends_with: String
  username: String

  """All values that are not equal to given value."""
  username_not: String

  """All values that are contained in given list."""
  username_in: [String!]

  """All values that are not contained in given list."""
  username_not_in: [String!]

  """All values less than the given value."""
  username_lt: String

  """All values less than or equal the given value."""
  username_lte: String

  """All values greater than the given value."""
  username_gt: String

  """All values greater than or equal the given value."""
  username_gte: String

  """All values containing the given string."""
  username_contains: String

  """All values not containing the given string."""
  username_not_contains: String

  """All values starting with the given string."""
  username_starts_with: String

  """All values not starting with the given string."""
  username_not_starts_with: String

  """All values ending with the given string."""
  username_ends_with: String

  """All values not ending with the given string."""
  username_not_ends_with: String
  displayName: String

  """All values that are not equal to given value."""
  displayName_not: String

  """All values that are contained in given list."""
  displayName_in: [String!]

  """All values that are not contained in given list."""
  displayName_not_in: [String!]

  """All values less than the given value."""
  displayName_lt: String

  """All values less than or equal the given value."""
  displayName_lte: String

  """All values greater than the given value."""
  displayName_gt: String

  """All values greater than or equal the given value."""
  displayName_gte: String

  """All values containing the given string."""
  displayName_contains: String

  """All values not containing the given string."""
  displayName_not_contains: String

  """All values starting with the given string."""
  displayName_starts_with: String

  """All values not starting with the given string."""
  displayName_not_starts_with: String

  """All values ending with the given string."""
  displayName_ends_with: String

  """All values not ending with the given string."""
  displayName_not_ends_with: String
  tweets_every: TweetWhereInput
  tweets_some: TweetWhereInput
  tweets_none: TweetWhereInput
}

input UserWhereUniqueInput {
  id: ID
  username: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({ typeDefs, endpoint: 'https://eu1.prisma.sh/nestjs/prisma-nest/dev' })
export const prisma = new Prisma()
