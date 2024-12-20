export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type CreatePostInput = {
  commitId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  repo: Scalars['String']['input'];
  repoOwner: Scalars['String']['input'];
  title: Scalars['String']['input'];
  topics: Array<Scalars['String']['input']>;
};

export type FindPostInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FindPostResponse = {
  __typename?: 'FindPostResponse';
  hasMore: Scalars['Boolean']['output'];
  posts: Array<Post>;
};

export type Mutation = {
  __typename?: 'Mutation';
  findOrCreate: PostResponse;
  logout: Scalars['Boolean']['output'];
};


export type MutationFindOrCreateArgs = {
  post: CreatePostInput;
};

export type Post = {
  __typename?: 'Post';
  commitId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  creatorId: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  numQuestions: Scalars['Int']['output'];
  repo: Scalars['String']['output'];
  repoOwner: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topics: Array<Scalars['String']['output']>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  post: Post;
};

export type Query = {
  __typename?: 'Query';
  findPost: FindPostResponse;
  getPostById?: Maybe<Post>;
  getUserByUsername?: Maybe<User>;
  me?: Maybe<User>;
  users: Array<User>;
};


export type QueryFindPostArgs = {
  input: FindPostInput;
};


export type QueryGetPostByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserByUsernameArgs = {
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  displayName: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  githubAccessToken?: Maybe<Scalars['String']['output']>;
  githubProfileUrl?: Maybe<Scalars['String']['output']>;
  hasUnreadNotification: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  username: Scalars['String']['output'];
};

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserByUsernameQuery = { __typename?: 'Query', getUserByUsername?: { __typename?: 'User', id: string, displayName: string, username: string, email?: string | null, avatarUrl: string, bio?: string | null } | null };

export type LogoutQueryMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutQueryMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, bio?: string | null, displayName: string, githubAccessToken?: string | null, email?: string | null, username: string, updatedAt: any, createdAt: any } | null };
