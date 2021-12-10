export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LocalPostCreatesResponse = {
  __typename?: 'LocalPostCreatesResponse';
  ids?: Maybe<Array<Scalars['ID']>>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLocalPosts?: Maybe<LocalPostCreatesResponse>;
  createNewPost?: Maybe<PostCreateResponse>;
  deletePost?: Maybe<Scalars['Boolean']>;
  deletePosts?: Maybe<Scalars['Boolean']>;
  mailPosts?: Maybe<Scalars['Boolean']>;
  updatePost?: Maybe<PostCreateResponse>;
};

export type MutationCreateLocalPostsArgs = {
  newLocalPosts?: Maybe<Array<Maybe<NewLocalPost>>>;
};

export type MutationCreateNewPostArgs = {
  content?: Maybe<Scalars['String']>;
  option?: Maybe<PostOptionInput>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};

export type MutationDeletePostsArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
};

export type MutationMailPostsArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
};

export type MutationUpdatePostArgs = {
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  option?: Maybe<PostOptionInput>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type NewLocalPost = {
  content?: Maybe<Scalars['String']>;
  localFormedDateString?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Page = {
  __typename?: 'Page';
  currentPage: Scalars['Int'];
  data: Array<SimplePost>;
  hasNext: Scalars['Boolean'];
  limit: Scalars['Int'];
  total: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  option?: Maybe<PostOption>;
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
};

export type PostCreateResponse = {
  __typename?: 'PostCreateResponse';
  id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type PostOption = {
  __typename?: 'PostOption';
  hasAutoTag?: Maybe<Scalars['Boolean']>;
};

export type PostOptionInput = {
  hasAutoTag?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  post: Post;
  posts?: Maybe<Page>;
  searchPostsByTag: Array<Maybe<SimplePost>>;
};

export type QueryPostArgs = {
  id: Scalars['ID'];
};

export type QueryPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type QuerySearchPostsByTagArgs = {
  tag?: Maybe<Scalars['String']>;
};

export type SimplePost = {
  __typename?: 'SimplePost';
  autoTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  preview: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  isLoggedIn: Scalars['Boolean'];
};

export type GetPostListQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;

export type GetPostListQuery = {
  __typename?: 'Query';
  posts?:
    | {
        __typename?: 'Page';
        total: number;
        currentPage: number;
        limit: number;
        hasNext: boolean;
        data: Array<{
          __typename?: 'SimplePost';
          id: string;
          title?: string | null | undefined;
          preview: string;
          tags?: Array<string> | null | undefined;
          autoTags?: Array<string | null | undefined> | null | undefined;
          createdAt: string;
        }>;
      }
    | null
    | undefined;
};

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetPostQuery = {
  __typename?: 'Query';
  post: {
    __typename?: 'Post';
    id: string;
    title?: string | null | undefined;
    content: string;
    tags?: Array<string> | null | undefined;
    option?:
      | { __typename?: 'PostOption'; hasAutoTag?: boolean | null | undefined }
      | null
      | undefined;
  };
};

export type SearchPostListByTagQueryVariables = Exact<{
  tag?: Maybe<Scalars['String']>;
}>;

export type SearchPostListByTagQuery = {
  __typename?: 'Query';
  searchPostsByTag: Array<
    | {
        __typename?: 'SimplePost';
        id: string;
        title?: string | null | undefined;
        preview: string;
        tags?: Array<string> | null | undefined;
        autoTags?: Array<string | null | undefined> | null | undefined;
        createdAt: string;
      }
    | null
    | undefined
  >;
};

export type CreateNewPostMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  option?: Maybe<PostOptionInput>;
}>;

export type CreateNewPostMutation = {
  __typename?: 'Mutation';
  createNewPost?:
    | { __typename?: 'PostCreateResponse'; success: boolean; id: string }
    | null
    | undefined;
};

export type CreateLocalPostsMutationVariables = Exact<{
  newLocalPosts?: Maybe<Array<Maybe<NewLocalPost>> | Maybe<NewLocalPost>>;
}>;

export type CreateLocalPostsMutation = {
  __typename?: 'Mutation';
  createLocalPosts?:
    | {
        __typename?: 'LocalPostCreatesResponse';
        success: boolean;
        ids?: Array<string> | null | undefined;
      }
    | null
    | undefined;
};

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeletePostMutation = {
  __typename?: 'Mutation';
  deletePost?: boolean | null | undefined;
};

export type DeletePostsMutationVariables = Exact<{
  ids?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;

export type DeletePostsMutation = {
  __typename?: 'Mutation';
  deletePosts?: boolean | null | undefined;
};

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  option?: Maybe<PostOptionInput>;
}>;

export type UpdatePostMutation = {
  __typename?: 'Mutation';
  updatePost?:
    | { __typename?: 'PostCreateResponse'; success: boolean; id: string }
    | null
    | undefined;
};

export type MailPostsMutationVariables = Exact<{
  ids?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;

export type MailPostsMutation = { __typename?: 'Mutation'; mailPosts?: boolean | null | undefined };

export type GetLoggedInUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetLoggedInUserQuery = {
  __typename?: 'Query';
  me: { __typename?: 'User'; isLoggedIn: boolean };
};
