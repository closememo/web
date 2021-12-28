import React from 'react';
import {
  GetPostListDocument,
  useDeletePostsMutation,
  useGetCategoriesQuery,
  useGetPostListQuery,
  useMailPostsMutation,
} from 'apollo/generated/hooks';
import PostList from 'client/components/PostList';
import Pagination from 'client/constants/Pagination';
import { Category } from 'apollo/generated/types';

const DEFAULT_CATEGORY_NAME = '메인';

function MainPage({ categoryId, currentPage }: { categoryId?: string | null, currentPage: number }) {
  const postListQueryResult = useGetPostListQuery({
    variables: { page: currentPage, limit: Pagination.PAGE_NUMBER, ...(!!categoryId && {categoryId: categoryId}) }
  });
  const categoriesQueryResult = useGetCategoriesQuery();

  const [deletePosts] = useDeletePostsMutation();
  const [mailPosts] = useMailPostsMutation();

  if (postListQueryResult.loading || categoriesQueryResult.loading) return <p>Loading...</p>;
  if (postListQueryResult.error || !postListQueryResult.data) return <p>Error</p>;
  if (categoriesQueryResult.error || !categoriesQueryResult.data) return <p>Error</p>;

  const refreshPosts = () => {
    postListQueryResult.client.refetchQueries({
      include: [GetPostListDocument],
    });
  };

  let fullName: string = getCategoryFullName(categoriesQueryResult.data.categories, categoryId);

  const total = postListQueryResult.data.posts?.total;
  const pageSize = Pagination.PAGE_NUMBER;
  const posts = postListQueryResult.data.posts ? postListQueryResult.data.posts.data : [];

  return (
    <PostList heading={fullName} total={total} currentPage={currentPage} pageSize={pageSize}
              posts={posts} refreshPosts={refreshPosts}
              deletePosts={deletePosts} mailPosts={mailPosts} />
  );
}

function getCategoryFullName(categories: Array<Category> | undefined, categoryId?: string | null): string {
  if (!categories || !categoryId) {
    return DEFAULT_CATEGORY_NAME;
  }
  const category = categories.find(category => category.id === categoryId);
  if (!category) {
    return DEFAULT_CATEGORY_NAME;
  }
  let name: string = category.name;
  let cursor: Category | undefined = category;

  while (true) {
    if (!cursor || !cursor.parentId) {
      return name;
    }
    cursor = categories.find(category => category.id === cursor?.parentId);
    if (!cursor) {
      return name;
    }
    name = cursor.name + '/' + name;
  }
}

export default MainPage;
