import React from 'react';
import {
  useDeletePostsMutation,
  useGetLoggedInUserQuery,
  useMailPostsMutation,
  useSearchPostListByTagQuery,
} from 'apollo/generated/hooks';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import PostList from 'client/components/PostList';

function Search({ location }: { location: Location }) {

  const search = location.search;
  const tag = new URLSearchParams(search).get('tag');

  const loggedInUserQueryResult = useGetLoggedInUserQuery();
  const searchPostsResult = useSearchPostListByTagQuery({
    variables: { tag },
  });
  const [deletePosts] = useDeletePostsMutation();
  const [mailPosts] = useMailPostsMutation();

  if (loggedInUserQueryResult.loading || searchPostsResult.loading) return <p>Loading...</p>;
  if (loggedInUserQueryResult.error || !loggedInUserQueryResult.data) return <p>Error</p>;
  if (searchPostsResult.error || !searchPostsResult.data) return <p>Error</p>;

  const isLoggedIn: boolean = loggedInUserQueryResult.data.me.isLoggedIn;
  const searchedPosts = searchPostsResult.data.searchPostsByTag;

  return (
    <>
      <Helmet>
        <title>검색</title>
      </Helmet>
      <Navigation isLoggedIn={isLoggedIn} />
      <Container as='main' className='home-main'>
        <PostList heading='태그검색' posts={searchedPosts} deletePosts={deletePosts} mailPosts={mailPosts} />
      </Container>
    </>
  );
}

export default Search;