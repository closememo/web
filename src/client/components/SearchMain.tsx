import React, { useEffect, useState } from 'react';
import PostListHeader from 'client/components/PostListHeader';
import Pagination from 'client/constants/Pagination';
import PostList from 'client/components/PostList';
import PersonalLocalCache from 'client/cache/PersonalLocalCache';
import {
  SearchPostListByTagDocument,
  useDeletePostsMutation,
  useMailPostsMutation,
  useSearchPostListByTagQuery,
} from 'apollo/generated/hooks';
import { SimplePost } from 'apollo/generated/types';

interface SearchMainParam {
  tag: string | null;
  isTempUser: boolean;
}

function SearchMain({ tag, isTempUser }: SearchMainParam) {

  const [orderOptionOpen, setOrderOptionOpen] = useState<boolean>(false);

  const searchPostsResult = useSearchPostListByTagQuery({
    variables: { tag },
    fetchPolicy: 'network-only',
  });
  const [deletePosts] = useDeletePostsMutation();
  const [mailPosts] = useMailPostsMutation();

  const searchedPosts: SimplePost[] = searchPostsResult.data?.searchPostsByTag || [];

  const refreshSearchPosts = async () => {
    await searchPostsResult.client.refetchQueries({
      include: [SearchPostListByTagDocument],
    });
    await searchPostsResult.client.cache.evict({
      id: 'ROOT_QUERY',
      fieldName: 'post',
    });
    await searchPostsResult.client.cache.gc();
  };

  useEffect(() => {
    refresh().then();
  }, []);

  const refresh = async () => {
    const orderOptionOpen = await PersonalLocalCache.getOrderOptionOpen();
    if (!!orderOptionOpen) {
      setOrderOptionOpen(orderOptionOpen);
    }
  };

  if (searchPostsResult.error) return <p>Error</p>;

  return (
    <>
      <PostListHeader heading={'[태그검색] 검색어: ' + tag}
                      orderOptionOpen={orderOptionOpen} setOrderOptionOpen={setOrderOptionOpen}
                      postCount={Pagination.PAGE_NUMBER} currentOrderType={'CREATED_NEWEST'} />
      <PostList loading={searchPostsResult.loading} posts={searchedPosts} refreshPosts={refreshSearchPosts}
                deletePosts={deletePosts} mailPosts={mailPosts}
                isTempUser={isTempUser} />
    </>
  );
}

export default SearchMain;
