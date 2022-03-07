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
import { Category, SimplePost } from 'apollo/generated/types';
import PersonalLocalCache from 'client/cache/PersonalLocalCache';
import PostListHeader from 'client/components/PostListHeader';

const DEFAULT_CATEGORY_NAME = '메인';

interface MainPageParams {
  categoryId?: string | null;
  currentPage: number;
  documentOrderType: string;
  documentCount: number;
  isTempUser?: boolean | null; // TODO: tempUser 제거
}

function MainPage({ categoryId, currentPage, documentOrderType, documentCount, isTempUser }: MainPageParams) {

  const [orderOptionOpen, setOrderOptionOpen] = useState<boolean>(false);

  useEffect(() => {
    refresh().then();
  }, []);

  const refresh = async () => {
    const orderOptionOpen = await PersonalLocalCache.getOrderOptionOpen();
    if (!!orderOptionOpen) {
      setOrderOptionOpen(orderOptionOpen);
    }
  };

  const postListQueryResult = useGetPostListQuery({
    variables: {
      page: currentPage,
      limit: documentCount,
      ...(!!categoryId && { categoryId: categoryId }),
      orderType: documentOrderType,
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
  const posts: SimplePost[] = postListQueryResult.data.posts ? postListQueryResult.data.posts.data : [];

  return (
    <>
      <PostListHeader heading={fullName} currentPage={currentPage} categoryId={categoryId}
                      orderOptionOpen={orderOptionOpen} setOrderOptionOpen={setOrderOptionOpen}
                      postCount={documentCount} currentOrderType={documentOrderType}
                      refetchPosts={postListQueryResult.refetch} />
      <PostList total={total} currentPage={currentPage} pageSize={documentCount} posts={posts}
                refreshPosts={refreshPosts} deletePosts={deletePosts} mailPosts={mailPosts}
                isTempUser={!!isTempUser} />
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
