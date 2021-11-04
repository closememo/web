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

export type Mutation = {
  __typename?: 'Mutation';
  createNewPost?: Maybe<PostCreateResponse>;
  deletePost?: Maybe<Scalars['Boolean']>;
  deletePosts?: Maybe<Scalars['Boolean']>;
  mailPosts?: Maybe<Scalars['Boolean']>;
  updatePost?: Maybe<PostCreateResponse>;
};

export type MutationCreateNewPostArgs = {
  content?: Maybe<Scalars['String']>;
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
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
};

export type PostCreateResponse = {
  __typename?: 'PostCreateResponse';
  id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  post: Post;
  posts: Array<Maybe<SimplePost>>;
};

export type QueryPostArgs = {
  id: Scalars['ID'];
};

export type SimplePost = {
  __typename?: 'SimplePost';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  preview?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  isLoggedIn: Scalars['Boolean'];
};

export type GetPostListQueryVariables = Exact<{ [key: string]: never }>;

export type GetPostListQuery = {
  __typename?: 'Query';
  posts: Array<
    | {
        __typename?: 'SimplePost';
        id: string;
        title?: string | null | undefined;
        preview?: string | null | undefined;
        tags?: Array<string> | null | undefined;
        createdAt?: string | null | undefined;
      }
    | null
    | undefined
  >;
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
  };
};

export type CreateNewPostMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;

export type CreateNewPostMutation = {
  __typename?: 'Mutation';
  createNewPost?:
    | { __typename?: 'PostCreateResponse'; success: boolean; id: string }
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
