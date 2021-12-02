import * as Types from 'apollo/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};

export const GetPostListDocument = gql`
  query GetPostList($page: Int, $limit: Int) {
    posts(page: $page, limit: $limit) {
      data {
        id
        title
        preview
        tags
        createdAt
      }
      total
      currentPage
      limit
      hasNext
    }
  }
`;

/**
 * __useGetPostListQuery__
 *
 * To run a query within a React component, call `useGetPostListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPostListQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.GetPostListQuery, Types.GetPostListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetPostListQuery, Types.GetPostListQueryVariables>(
    GetPostListDocument,
    options,
  );
}
export function useGetPostListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetPostListQuery,
    Types.GetPostListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetPostListQuery, Types.GetPostListQueryVariables>(
    GetPostListDocument,
    options,
  );
}
export type GetPostListQueryHookResult = ReturnType<typeof useGetPostListQuery>;
export type GetPostListLazyQueryHookResult = ReturnType<typeof useGetPostListLazyQuery>;
export type GetPostListQueryResult = Apollo.QueryResult<
  Types.GetPostListQuery,
  Types.GetPostListQueryVariables
>;
export const GetPostDocument = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      tags
    }
  }
`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(
  baseOptions: Apollo.QueryHookOptions<Types.GetPostQuery, Types.GetPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetPostQuery, Types.GetPostQueryVariables>(GetPostDocument, options);
}
export function useGetPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GetPostQuery, Types.GetPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetPostQuery, Types.GetPostQueryVariables>(
    GetPostDocument,
    options,
  );
}
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<
  Types.GetPostQuery,
  Types.GetPostQueryVariables
>;
export const SearchPostListByTagDocument = gql`
  query SearchPostListByTag($tag: String) {
    searchPostsByTag(tag: $tag) {
      id
      title
      preview
      tags
      createdAt
    }
  }
`;

/**
 * __useSearchPostListByTagQuery__
 *
 * To run a query within a React component, call `useSearchPostListByTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPostListByTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPostListByTagQuery({
 *   variables: {
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useSearchPostListByTagQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.SearchPostListByTagQuery,
    Types.SearchPostListByTagQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.SearchPostListByTagQuery, Types.SearchPostListByTagQueryVariables>(
    SearchPostListByTagDocument,
    options,
  );
}
export function useSearchPostListByTagLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.SearchPostListByTagQuery,
    Types.SearchPostListByTagQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.SearchPostListByTagQuery,
    Types.SearchPostListByTagQueryVariables
  >(SearchPostListByTagDocument, options);
}
export type SearchPostListByTagQueryHookResult = ReturnType<typeof useSearchPostListByTagQuery>;
export type SearchPostListByTagLazyQueryHookResult = ReturnType<
  typeof useSearchPostListByTagLazyQuery
>;
export type SearchPostListByTagQueryResult = Apollo.QueryResult<
  Types.SearchPostListByTagQuery,
  Types.SearchPostListByTagQueryVariables
>;
export const CreateNewPostDocument = gql`
  mutation CreateNewPost($title: String, $content: String, $tags: [String]) {
    createNewPost(title: $title, content: $content, tags: $tags) {
      success
      id
    }
  }
`;
export type CreateNewPostMutationFn = Apollo.MutationFunction<
  Types.CreateNewPostMutation,
  Types.CreateNewPostMutationVariables
>;

/**
 * __useCreateNewPostMutation__
 *
 * To run a mutation, you first call `useCreateNewPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewPostMutation, { data, loading, error }] = useCreateNewPostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useCreateNewPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateNewPostMutation,
    Types.CreateNewPostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.CreateNewPostMutation, Types.CreateNewPostMutationVariables>(
    CreateNewPostDocument,
    options,
  );
}
export type CreateNewPostMutationHookResult = ReturnType<typeof useCreateNewPostMutation>;
export type CreateNewPostMutationResult = Apollo.MutationResult<Types.CreateNewPostMutation>;
export type CreateNewPostMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateNewPostMutation,
  Types.CreateNewPostMutationVariables
>;
export const CreateLocalPostsDocument = gql`
  mutation createLocalPosts($newLocalPosts: [NewLocalPost]) {
    createLocalPosts(newLocalPosts: $newLocalPosts) {
      success
      ids
    }
  }
`;
export type CreateLocalPostsMutationFn = Apollo.MutationFunction<
  Types.CreateLocalPostsMutation,
  Types.CreateLocalPostsMutationVariables
>;

/**
 * __useCreateLocalPostsMutation__
 *
 * To run a mutation, you first call `useCreateLocalPostsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLocalPostsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLocalPostsMutation, { data, loading, error }] = useCreateLocalPostsMutation({
 *   variables: {
 *      newLocalPosts: // value for 'newLocalPosts'
 *   },
 * });
 */
export function useCreateLocalPostsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateLocalPostsMutation,
    Types.CreateLocalPostsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.CreateLocalPostsMutation,
    Types.CreateLocalPostsMutationVariables
  >(CreateLocalPostsDocument, options);
}
export type CreateLocalPostsMutationHookResult = ReturnType<typeof useCreateLocalPostsMutation>;
export type CreateLocalPostsMutationResult = Apollo.MutationResult<Types.CreateLocalPostsMutation>;
export type CreateLocalPostsMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateLocalPostsMutation,
  Types.CreateLocalPostsMutationVariables
>;
export const DeletePostDocument = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
export type DeletePostMutationFn = Apollo.MutationFunction<
  Types.DeletePostMutation,
  Types.DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeletePostMutation,
    Types.DeletePostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.DeletePostMutation, Types.DeletePostMutationVariables>(
    DeletePostDocument,
    options,
  );
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<Types.DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
  Types.DeletePostMutation,
  Types.DeletePostMutationVariables
>;
export const DeletePostsDocument = gql`
  mutation DeletePosts($ids: [ID!]) {
    deletePosts(ids: $ids)
  }
`;
export type DeletePostsMutationFn = Apollo.MutationFunction<
  Types.DeletePostsMutation,
  Types.DeletePostsMutationVariables
>;

/**
 * __useDeletePostsMutation__
 *
 * To run a mutation, you first call `useDeletePostsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostsMutation, { data, loading, error }] = useDeletePostsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeletePostsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeletePostsMutation,
    Types.DeletePostsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.DeletePostsMutation, Types.DeletePostsMutationVariables>(
    DeletePostsDocument,
    options,
  );
}
export type DeletePostsMutationHookResult = ReturnType<typeof useDeletePostsMutation>;
export type DeletePostsMutationResult = Apollo.MutationResult<Types.DeletePostsMutation>;
export type DeletePostsMutationOptions = Apollo.BaseMutationOptions<
  Types.DeletePostsMutation,
  Types.DeletePostsMutationVariables
>;
export const UpdatePostDocument = gql`
  mutation UpdatePost($id: ID!, $title: String, $content: String, $tags: [String]) {
    updatePost(id: $id, title: $title, content: $content, tags: $tags) {
      success
      id
    }
  }
`;
export type UpdatePostMutationFn = Apollo.MutationFunction<
  Types.UpdatePostMutation,
  Types.UpdatePostMutationVariables
>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdatePostMutation,
    Types.UpdatePostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.UpdatePostMutation, Types.UpdatePostMutationVariables>(
    UpdatePostDocument,
    options,
  );
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<Types.UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdatePostMutation,
  Types.UpdatePostMutationVariables
>;
export const MailPostsDocument = gql`
  mutation MailPosts($ids: [ID!]) {
    mailPosts(ids: $ids)
  }
`;
export type MailPostsMutationFn = Apollo.MutationFunction<
  Types.MailPostsMutation,
  Types.MailPostsMutationVariables
>;

/**
 * __useMailPostsMutation__
 *
 * To run a mutation, you first call `useMailPostsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMailPostsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mailPostsMutation, { data, loading, error }] = useMailPostsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useMailPostsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.MailPostsMutation,
    Types.MailPostsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.MailPostsMutation, Types.MailPostsMutationVariables>(
    MailPostsDocument,
    options,
  );
}
export type MailPostsMutationHookResult = ReturnType<typeof useMailPostsMutation>;
export type MailPostsMutationResult = Apollo.MutationResult<Types.MailPostsMutation>;
export type MailPostsMutationOptions = Apollo.BaseMutationOptions<
  Types.MailPostsMutation,
  Types.MailPostsMutationVariables
>;
export const GetLoggedInUserDocument = gql`
  query GetLoggedInUser {
    me {
      isLoggedIn
    }
  }
`;

/**
 * __useGetLoggedInUserQuery__
 *
 * To run a query within a React component, call `useGetLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoggedInUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetLoggedInUserQuery,
    Types.GetLoggedInUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetLoggedInUserQuery, Types.GetLoggedInUserQueryVariables>(
    GetLoggedInUserDocument,
    options,
  );
}
export function useGetLoggedInUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetLoggedInUserQuery,
    Types.GetLoggedInUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetLoggedInUserQuery, Types.GetLoggedInUserQueryVariables>(
    GetLoggedInUserDocument,
    options,
  );
}
export type GetLoggedInUserQueryHookResult = ReturnType<typeof useGetLoggedInUserQuery>;
export type GetLoggedInUserLazyQueryHookResult = ReturnType<typeof useGetLoggedInUserLazyQuery>;
export type GetLoggedInUserQueryResult = Apollo.QueryResult<
  Types.GetLoggedInUserQuery,
  Types.GetLoggedInUserQueryVariables
>;
