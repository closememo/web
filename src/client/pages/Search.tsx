import React, { useState } from 'react';
import {
  SearchPostListByTagDocument,
  useDeletePostsMutation,
  useGetCurrentCategoryQuery,
  useGetLoggedInUserQuery,
  useMailPostsMutation,
  useSearchPostListByTagQuery,
} from 'apollo/generated/hooks';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import PostList from 'client/components/PostList';
import PostListHeader from 'client/components/PostListHeader';
import Pagination from 'client/constants/Pagination';
import FixedMenu from 'client/components/FixedMenu';
import { SimplePost } from 'apollo/generated/types';

function Search({ location }: { location: Location }) {

  const [orderOptionOpen, setOrderOptionOpen] = useState<boolean>(false);

  const search = location.search;
  const tag = new URLSearchParams(search).get('tag');

  const loggedInUserQueryResult = useGetLoggedInUserQuery();
  const currentCategoryQueryResult = useGetCurrentCategoryQuery();
  const searchPostsResult = useSearchPostListByTagQuery({
    variables: { tag },
    fetchPolicy: 'network-only',
  });
  const [deletePosts] = useDeletePostsMutation();
  const [mailPosts] = useMailPostsMutation();

  if (loggedInUserQueryResult.loading || searchPostsResult.loading) return <p>Loading...</p>;
  if (loggedInUserQueryResult.error || !loggedInUserQueryResult.data) return <p>Error</p>;
  if (searchPostsResult.error || !searchPostsResult.data) return <p>Error</p>;

  const isLoggedIn: boolean = loggedInUserQueryResult.data.me.isLoggedIn;
  const isTempUser: boolean | null | undefined = loggedInUserQueryResult.data.me.isTempUser; // TODO: tempUser 제거
  const categoryId: string | null | undefined = currentCategoryQueryResult.data?.currentCategory;
  const searchedPosts: SimplePost[] = searchPostsResult.data.searchPostsByTag;

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

  return (
    <>
      <Helmet>
        <title>검색</title>
      </Helmet>
      <Navigation categoryId={categoryId} isLoggedIn={isLoggedIn} isTempUser={!!isTempUser} />
      <Container as='main' className='home-main'>
        <PostListHeader heading={'[태그검색] 검색어: ' + tag}
                        orderOptionOpen={orderOptionOpen} setOrderOptionOpen={setOrderOptionOpen}
                        postCount={Pagination.PAGE_NUMBER} currentOrderType={'CREATED_NEWEST'} />
        <PostList posts={searchedPosts} refreshPosts={refreshSearchPosts}
                  deletePosts={deletePosts} mailPosts={mailPosts}
                  isTempUser={!!isTempUser} />
      </Container>
      <FixedMenu isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Search;