import React from 'react';
import {
  GetPostListDocument,
  useDeletePostsMutation,
  useGetPostListQuery,
  useMailPostsMutation,
} from 'apollo/generated/hooks';
import PostList from 'client/components/PostList';

function MainPage() {
  const { client, data, error, loading } = useGetPostListQuery();
  const [deletePosts] = useDeletePostsMutation();
  const [mailPosts] = useMailPostsMutation();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const refreshPosts = () => {
    client.refetchQueries({
      include: [GetPostListDocument]
    })
  }

  return (
    <PostList heading='목록' posts={data.posts}
              refreshPosts={refreshPosts} deletePosts={deletePosts} mailPosts={mailPosts} />
  );
}

export default MainPage;
