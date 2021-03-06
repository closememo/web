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

export type BookmarkedPost = {
  __typename?: 'BookmarkedPost';
  documentId: Scalars['String'];
  id: Scalars['ID'];
  preview: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  childrenIds?: Maybe<Array<Scalars['String']>>;
  count?: Maybe<Scalars['Int']>;
  depth?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  isRoot?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  netCount?: Maybe<Scalars['Int']>;
};

export type ChangePatch = {
  __typename?: 'ChangePatch';
  changed?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  value: Scalars['String'];
};

export type Difference = {
  __typename?: 'Difference';
  createdAt: Scalars['String'];
  documentVersion: Scalars['Int'];
  id: Scalars['ID'];
  lineDeltas: Array<LineDelta>;
};

export type Line = {
  __typename?: 'Line';
  position: Scalars['Int'];
  value?: Maybe<Scalars['String']>;
};

export type LineDelta = {
  __typename?: 'LineDelta';
  changePatches: Array<ChangePatch>;
  source: Line;
  target: Line;
  type: Scalars['String'];
};

export type LocalPostCreatesResponse = {
  __typename?: 'LocalPostCreatesResponse';
  ids?: Maybe<Array<Scalars['ID']>>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePostsCategory?: Maybe<Scalars['Boolean']>;
  clearDifferences?: Maybe<Scalars['Boolean']>;
  createBookmark?: Maybe<Scalars['Boolean']>;
  createCategory?: Maybe<Scalars['Boolean']>;
  createLocalPosts?: Maybe<LocalPostCreatesResponse>;
  createNewPost?: Maybe<PostCreateResponse>;
  createSuggestion?: Maybe<Scalars['Boolean']>;
  deleteBookmark?: Maybe<Scalars['Boolean']>;
  deleteCategory?: Maybe<Scalars['Boolean']>;
  deletePost?: Maybe<Scalars['Boolean']>;
  deletePosts?: Maybe<Scalars['Boolean']>;
  deleteSuggestion?: Maybe<Scalars['Boolean']>;
  mailPosts?: Maybe<Scalars['Boolean']>;
  updateAccountOption?: Maybe<Scalars['Boolean']>;
  updateAccountTrack?: Maybe<Scalars['Boolean']>;
  updateCategory?: Maybe<Scalars['Boolean']>;
  updatePost?: Maybe<PostCreateResponse>;
  updateSuggestion?: Maybe<Scalars['Boolean']>;
};

export type MutationChangePostsCategoryArgs = {
  categoryId?: Maybe<Scalars['String']>;
  ids?: Maybe<Array<Scalars['ID']>>;
};

export type MutationClearDifferencesArgs = {
  id: Scalars['ID'];
};

export type MutationCreateBookmarkArgs = {
  postId: Scalars['String'];
};

export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
};

export type MutationCreateLocalPostsArgs = {
  newLocalPosts?: Maybe<Array<Maybe<NewLocalPost>>>;
};

export type MutationCreateNewPostArgs = {
  categoryId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  option?: Maybe<PostOptionInput>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type MutationCreateSuggestionArgs = {
  content: Scalars['String'];
};

export type MutationDeleteBookmarkArgs = {
  postId: Scalars['String'];
};

export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['ID'];
};

export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};

export type MutationDeletePostsArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
};

export type MutationDeleteSuggestionArgs = {
  suggestionId: Scalars['ID'];
};

export type MutationMailPostsArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
};

export type MutationUpdateAccountOptionArgs = {
  documentCount?: Maybe<Scalars['Int']>;
  documentOrderType?: Maybe<Scalars['String']>;
};

export type MutationUpdateAccountTrackArgs = {
  recentlyViewedCategoryId: Scalars['String'];
};

export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['ID'];
  name: Scalars['String'];
};

export type MutationUpdatePostArgs = {
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  option?: Maybe<PostOptionInput>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type MutationUpdateSuggestionArgs = {
  content: Scalars['String'];
  suggestionId: Scalars['ID'];
};

export type NewLocalPost = {
  content?: Maybe<Scalars['String']>;
  localFormedDateString?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Notice = {
  __typename?: 'Notice';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type NoticeListElement = {
  __typename?: 'NoticeListElement';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  preview: Scalars['String'];
  title: Scalars['String'];
};

export type NoticeListElementPage = {
  __typename?: 'NoticeListElementPage';
  currentPage: Scalars['Int'];
  data: Array<NoticeListElement>;
  hasNext: Scalars['Boolean'];
  limit: Scalars['Int'];
  total: Scalars['Int'];
};

export type Notification = {
  __typename?: 'Notification';
  data?: Maybe<NotificationData>;
  exist: Scalars['Boolean'];
};

export type NotificationData = {
  __typename?: 'NotificationData';
  content: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
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
  bookmarked: Scalars['Boolean'];
  categoryId?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  diffCount: Scalars['Int'];
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
  bookmarkedPosts: Array<BookmarkedPost>;
  categories: Array<Category>;
  currentCategory?: Maybe<Scalars['String']>;
  currentNotification?: Maybe<Notification>;
  difference: Difference;
  differences: Array<SimpleDifference>;
  me: User;
  notice?: Maybe<Notice>;
  noticeListElements?: Maybe<NoticeListElementPage>;
  post: Post;
  posts?: Maybe<Page>;
  searchPostsByTag: Array<SimplePost>;
  suggestion?: Maybe<Suggestion>;
  suggestions: Array<SuggestionListElement>;
};

export type QueryDifferenceArgs = {
  differenceId: Scalars['ID'];
};

export type QueryDifferencesArgs = {
  documentId: Scalars['String'];
};

export type QueryNoticeArgs = {
  noticeId: Scalars['ID'];
};

export type QueryPostArgs = {
  id: Scalars['ID'];
};

export type QueryPostsArgs = {
  categoryId?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  orderType?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
};

export type QuerySearchPostsByTagArgs = {
  tag?: Maybe<Scalars['String']>;
};

export type QuerySuggestionArgs = {
  suggestionId: Scalars['ID'];
};

export type SimpleDifference = {
  __typename?: 'SimpleDifference';
  changed: Scalars['Int'];
  createdAt: Scalars['String'];
  deleted: Scalars['Int'];
  documentVersion: Scalars['Int'];
  id: Scalars['ID'];
  inserted: Scalars['Int'];
};

export type SimplePost = {
  __typename?: 'SimplePost';
  autoTags?: Maybe<Array<Scalars['String']>>;
  bookmarked: Scalars['Boolean'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  preview: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type SuggestionListElement = {
  __typename?: 'SuggestionListElement';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  preview: Scalars['String'];
  status: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  documentCount?: Maybe<Scalars['Int']>;
  documentOrderType?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isLoggedIn: Scalars['Boolean'];
  isTempUser?: Maybe<Scalars['Boolean']>;
  recentlyViewedCategoryId?: Maybe<Scalars['String']>;
};

export type CreateBookmarkMutationVariables = Exact<{
  postId: Scalars['String'];
}>;

export type CreateBookmarkMutation = {
  __typename?: 'Mutation';
  createBookmark?: boolean | null | undefined;
};

export type DeleteBookmarkMutationVariables = Exact<{
  postId: Scalars['String'];
}>;

export type DeleteBookmarkMutation = {
  __typename?: 'Mutation';
  deleteBookmark?: boolean | null | undefined;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{
    __typename?: 'Category';
    id: string;
    name: string;
    isRoot?: boolean | null | undefined;
    childrenIds?: Array<string> | null | undefined;
    count?: number | null | undefined;
    depth?: number | null | undefined;
    netCount?: number | null | undefined;
  }>;
};

export type GetCurrentCategoryQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentCategoryQuery = {
  __typename?: 'Query';
  currentCategory?: string | null | undefined;
};

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory?: boolean | null | undefined;
};

export type UpdateCategoryMutationVariables = Exact<{
  categoryId: Scalars['ID'];
  name: Scalars['String'];
}>;

export type UpdateCategoryMutation = {
  __typename?: 'Mutation';
  updateCategory?: boolean | null | undefined;
};

export type DeleteCategoryMutationVariables = Exact<{
  categoryId: Scalars['ID'];
}>;

export type DeleteCategoryMutation = {
  __typename?: 'Mutation';
  deleteCategory?: boolean | null | undefined;
};

export type GetDifferencesQueryVariables = Exact<{
  documentId: Scalars['String'];
}>;

export type GetDifferencesQuery = {
  __typename?: 'Query';
  differences: Array<{
    __typename?: 'SimpleDifference';
    id: string;
    documentVersion: number;
    createdAt: string;
    inserted: number;
    deleted: number;
    changed: number;
  }>;
};

export type GetDifferenceQueryVariables = Exact<{
  differenceId: Scalars['ID'];
}>;

export type GetDifferenceQuery = {
  __typename?: 'Query';
  difference: {
    __typename?: 'Difference';
    id: string;
    documentVersion: number;
    createdAt: string;
    lineDeltas: Array<{
      __typename?: 'LineDelta';
      type: string;
      source: { __typename?: 'Line'; position: number; value?: string | null | undefined };
      target: { __typename?: 'Line'; position: number; value?: string | null | undefined };
      changePatches: Array<{
        __typename?: 'ChangePatch';
        type: string;
        value: string;
        changed?: string | null | undefined;
      }>;
    }>;
  };
};

export type GetNoticeListElementsQueryVariables = Exact<{ [key: string]: never }>;

export type GetNoticeListElementsQuery = {
  __typename?: 'Query';
  noticeListElements?:
    | {
        __typename?: 'NoticeListElementPage';
        total: number;
        currentPage: number;
        limit: number;
        hasNext: boolean;
        data: Array<{
          __typename?: 'NoticeListElement';
          id: string;
          title: string;
          preview: string;
          createdAt: string;
        }>;
      }
    | null
    | undefined;
};

export type GetNoticeQueryVariables = Exact<{
  noticeId: Scalars['ID'];
}>;

export type GetNoticeQuery = {
  __typename?: 'Query';
  notice?:
    | { __typename?: 'Notice'; id: string; title: string; content: string; createdAt: string }
    | null
    | undefined;
};

export type GetCurrentNotificationQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentNotificationQuery = {
  __typename?: 'Query';
  currentNotification?:
    | {
        __typename?: 'Notification';
        exist: boolean;
        data?:
          | { __typename?: 'NotificationData'; id: string; title: string; content: string }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GetPostListQueryVariables = Exact<{
  categoryId?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  orderType?: Maybe<Scalars['String']>;
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
          autoTags?: Array<string> | null | undefined;
          createdAt: string;
          bookmarked: boolean;
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
    categoryId?: string | null | undefined;
    title?: string | null | undefined;
    content: string;
    tags?: Array<string> | null | undefined;
    diffCount: number;
    bookmarked: boolean;
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
  searchPostsByTag: Array<{
    __typename?: 'SimplePost';
    id: string;
    title?: string | null | undefined;
    preview: string;
    tags?: Array<string> | null | undefined;
    autoTags?: Array<string> | null | undefined;
    createdAt: string;
    bookmarked: boolean;
  }>;
};

export type BookmarkedPostsQueryVariables = Exact<{ [key: string]: never }>;

export type BookmarkedPostsQuery = {
  __typename?: 'Query';
  bookmarkedPosts: Array<{
    __typename?: 'BookmarkedPost';
    id: string;
    documentId: string;
    title?: string | null | undefined;
    preview: string;
  }>;
};

export type CreateNewPostMutationVariables = Exact<{
  categoryId?: Maybe<Scalars['String']>;
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

export type ChangePostsCategoryMutationVariables = Exact<{
  categoryId?: Maybe<Scalars['String']>;
  ids?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;

export type ChangePostsCategoryMutation = {
  __typename?: 'Mutation';
  changePostsCategory?: boolean | null | undefined;
};

export type MailPostsMutationVariables = Exact<{
  ids?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;

export type MailPostsMutation = { __typename?: 'Mutation'; mailPosts?: boolean | null | undefined };

export type ClearDifferencesMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ClearDifferencesMutation = {
  __typename?: 'Mutation';
  clearDifferences?: boolean | null | undefined;
};

export type GetSuggestionListElementsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSuggestionListElementsQuery = {
  __typename?: 'Query';
  suggestions: Array<{
    __typename?: 'SuggestionListElement';
    id: string;
    preview: string;
    createdAt: string;
    status: string;
  }>;
};

export type GetSuggestionQueryVariables = Exact<{
  suggestionId: Scalars['ID'];
}>;

export type GetSuggestionQuery = {
  __typename?: 'Query';
  suggestion?: { __typename?: 'Suggestion'; id: string; content: string } | null | undefined;
};

export type CreateSuggestionMutationVariables = Exact<{
  content: Scalars['String'];
}>;

export type CreateSuggestionMutation = {
  __typename?: 'Mutation';
  createSuggestion?: boolean | null | undefined;
};

export type UpdateSuggestionMutationVariables = Exact<{
  suggestionId: Scalars['ID'];
  content: Scalars['String'];
}>;

export type UpdateSuggestionMutation = {
  __typename?: 'Mutation';
  updateSuggestion?: boolean | null | undefined;
};

export type DeleteSuggestionMutationVariables = Exact<{
  suggestionId: Scalars['ID'];
}>;

export type DeleteSuggestionMutation = {
  __typename?: 'Mutation';
  deleteSuggestion?: boolean | null | undefined;
};

export type GetLoggedInUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetLoggedInUserQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'User';
    id: string;
    isLoggedIn: boolean;
    isTempUser?: boolean | null | undefined;
    documentOrderType?: string | null | undefined;
    documentCount?: number | null | undefined;
    recentlyViewedCategoryId?: string | null | undefined;
  };
};

export type UpdateAccountOptionMutationVariables = Exact<{
  documentOrderType?: Maybe<Scalars['String']>;
  documentCount?: Maybe<Scalars['Int']>;
}>;

export type UpdateAccountOptionMutation = {
  __typename?: 'Mutation';
  updateAccountOption?: boolean | null | undefined;
};

export type UpdateAccountTrackMutationVariables = Exact<{
  recentlyViewedCategoryId: Scalars['String'];
}>;

export type UpdateAccountTrackMutation = {
  __typename?: 'Mutation';
  updateAccountTrack?: boolean | null | undefined;
};
