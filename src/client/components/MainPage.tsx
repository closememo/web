import React, { useEffect, useState } from 'react';
import {
  GetCategoriesDocument,
  GetPostListDocument,
  useDeletePostsMutation,
  useGetCategoriesQuery,
  useGetPostListQuery,
  useMailPostsMutation,
} from 'apollo/generated/hooks';
import PostList from 'client/components/PostList';
import Pagination from 'client/constants/Pagination';
import { Category } from 'apollo/generated/types';
import PersonalLocalCache from 'client/cache/PersonalLocalCache';
import PostListHeader from 'client/components/PostListHeader';

const DEFAULT_CATEGORY_NAME = '메인';

function MainPage({ categoryId, currentPage }: { categoryId?: string | null, currentPage: number }) {

  const [orderOptionOpen, setOrderOptionOpen] = useState<boolean>(false);
  const [postCount, setPostCount] = useState(Pagination.PAGE_NUMBER);
  const [currentOrderType, setCurrentOrderType] = useState<string>('CREATED_NEWEST');

  useEffect(() => {
    refresh().then();
  }, []);

  const refresh = async () => {
    const orderOptionOpen = await PersonalLocalCache.getOrderOptionOpen();
    if (!!orderOptionOpen) {
      setOrderOptionOpen(orderOptionOpen);
    }
    const orderType = await PersonalLocalCache.getOrderType();
    if (!!orderType) {
      setCurrentOrderType(orderType);
    }
    const postCount = await PersonalLocalCache.getPostCount();
    if (!!postCount) {
      setPostCount(postCount);
    }
  };

  const postListQueryResult = useGetPostListQuery({
    variables: {
      page: currentPage,
      limit: postCount,
      ...(!!categoryId && { categoryId: categoryId }),
      orderType: currentOrderType,
    },
  });
  const categoriesQueryResult = useGetCategoriesQuery();

  const [deletePosts] = useDeletePostsMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
  });
  const [mailPosts] = useMailPostsMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
  });

  if (postListQueryResult.loading || categoriesQueryResult.loading) return <p>Loading...</p>;
  if (postListQueryResult.error || !postListQueryResult.data) return <p>Error</p>;
  if (categoriesQueryResult.error || !categoriesQueryResult.data) return <p>Error</p>;

  const refreshPosts = async () => {
    await postListQueryResult.client.refetchQueries({
      include: [GetPostListDocument],
    });
    await postListQueryResult.client.cache.evict({
      id: 'ROOT_QUERY',
      fieldName: 'post',
    });
    await postListQueryResult.client.cache.gc();
  };

  let fullName: string = getCategoryFullName(categoriesQueryResult.data.categories, categoryId);

  const total = postListQueryResult.data.posts?.total;
  const posts = postListQueryResult.data.posts ? postListQueryResult.data.posts.data : [];

  return (
    <>
      <PostListHeader heading={fullName} currentPage={currentPage} categoryId={categoryId}
                      orderOptionOpen={orderOptionOpen} setOrderOptionOpen={setOrderOptionOpen}
                      postCount={postCount} setPostCount={setPostCount}
                      currentOrderType={currentOrderType} setCurrentOrderType={setCurrentOrderType}
                      refetchPosts={postListQueryResult.refetch} />
      <PostList total={total} currentPage={currentPage} pageSize={postCount} posts={posts}
                refreshPosts={refreshPosts} deletePosts={deletePosts} mailPosts={mailPosts} />
    </>
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
    cursor = categories.find(category => {
      return (!!category.childrenIds) && (!!cursor) && category.childrenIds.includes(cursor.id);
    });
    if (!cursor) {
      return name;
    }
    name = cursor.name + '/' + name;
  }
}

export default MainPage;
