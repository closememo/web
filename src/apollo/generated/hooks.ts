import * as Types from 'apollo/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};

export const GetCategoriesDocument = gql`
  query GetCategories {
    categories {
      id
      name
      isRoot
      childrenIds
      count
      depth
      netCount
    }
  }
`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetCategoriesQuery,
    Types.GetCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetCategoriesQuery, Types.GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  );
}
export function useGetCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetCategoriesQuery,
    Types.GetCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetCategoriesQuery, Types.GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  );
}
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<
  Types.GetCategoriesQuery,
  Types.GetCategoriesQueryVariables
>;
export const GetCurrentCategoryDocument = gql`
  query getCurrentCategory {
    currentCategory @client
  }
`;

/**
 * __useGetCurrentCategoryQuery__
 *
 * To run a query within a React component, call `useGetCurrentCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentCategoryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetCurrentCategoryQuery,
    Types.GetCurrentCategoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetCurrentCategoryQuery, Types.GetCurrentCategoryQueryVariables>(
    GetCurrentCategoryDocument,
    options,
  );
}
export function useGetCurrentCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetCurrentCategoryQuery,
    Types.GetCurrentCategoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetCurrentCategoryQuery, Types.GetCurrentCategoryQueryVariables>(
    GetCurrentCategoryDocument,
    options,
  );
}
export type GetCurrentCategoryQueryHookResult = ReturnType<typeof useGetCurrentCategoryQuery>;
export type GetCurrentCategoryLazyQueryHookResult = ReturnType<
  typeof useGetCurrentCategoryLazyQuery
>;
export type GetCurrentCategoryQueryResult = Apollo.QueryResult<
  Types.GetCurrentCategoryQuery,
  Types.GetCurrentCategoryQueryVariables
>;
export const CreateCategoryDocument = gql`
  mutation CreateCategory($name: String!, $parentId: String) {
    createCategory(name: $name, parentId: $parentId)
  }
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  Types.CreateCategoryMutation,
  Types.CreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateCategoryMutation,
    Types.CreateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.CreateCategoryMutation, Types.CreateCategoryMutationVariables>(
    CreateCategoryDocument,
    options,
  );
}
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<Types.CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateCategoryMutation,
  Types.CreateCategoryMutationVariables
>;
export const UpdateCategoryDocument = gql`
  mutation UpdateCategory($categoryId: ID!, $name: String!) {
    updateCategory(categoryId: $categoryId, name: $name)
  }
`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
  Types.UpdateCategoryMutation,
  Types.UpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateCategoryMutation,
    Types.UpdateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.UpdateCategoryMutation, Types.UpdateCategoryMutationVariables>(
    UpdateCategoryDocument,
    options,
  );
}
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<Types.UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateCategoryMutation,
  Types.UpdateCategoryMutationVariables
>;
export const DeleteCategoryDocument = gql`
  mutation DeleteCategory($categoryId: ID!) {
    deleteCategory(categoryId: $categoryId)
  }
`;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<
  Types.DeleteCategoryMutation,
  Types.DeleteCategoryMutationVariables
>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteCategoryMutation,
    Types.DeleteCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.DeleteCategoryMutation, Types.DeleteCategoryMutationVariables>(
    DeleteCategoryDocument,
    options,
  );
}
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<Types.DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteCategoryMutation,
  Types.DeleteCategoryMutationVariables
>;
export const GetPostListDocument = gql`
  query GetPostList($categoryId: String, $page: Int, $limit: Int) {
    posts(categoryId: $categoryId, page: $page, limit: $limit) {
      data {
        id
        title
        preview
        tags
        autoTags
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
 *      categoryId: // value for 'categoryId'
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
      option {
        hasAutoTag
      }
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
      autoTags
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
  mutation CreateNewPost(
    $categoryId: String
    $title: String
    $content: String
    $tags: [String]
    $option: PostOptionInput
  ) {
    createNewPost(
      categoryId: $categoryId
      title: $title
      content: $content
      tags: $tags
      option: $option
    ) {
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
 *      categoryId: // value for 'categoryId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *      option: // value for 'option'
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
  mutation UpdatePost(
    $id: ID!
    $title: String
    $content: String
    $tags: [String]
    $option: PostOptionInput
  ) {
    updatePost(id: $id, title: $title, content: $content, tags: $tags, option: $option) {
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
 *      option: // value for 'option'
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
