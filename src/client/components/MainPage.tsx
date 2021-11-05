import React from 'react';
import { useDeletePostsMutation, useGetPostListQuery, useMailPostsMutation } from 'apollo/generated/hooks';
import PostList from 'client/components/PostList';

function MainPage() {
  const { data, error, loading } = useGetPostListQuery();
  const [deletePosts] = useDeletePostsMutation();
  const [mailPosts] = useMailPostsMutation();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  return (
    <PostList posts={data.posts} deletePosts={deletePosts} mailPosts={mailPosts} />
  );
}

export default MainPage;
