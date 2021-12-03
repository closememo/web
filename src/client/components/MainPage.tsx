import React from 'react';
import {
  GetPostListDocument,
  useDeletePostsMutation,
  useGetPostListQuery,
  useMailPostsMutation,
} from 'apollo/generated/hooks';
import PostList from 'client/components/PostList';
import Pagination from 'client/constants/Pagination';

function MainPage({ currentPage }: { currentPage: number }) {
  const { client, data, error, loading } = useGetPostListQuery({
    variables: { page: currentPage, limit: Pagination.PAGE_NUMBER },
  });
  const [deletePosts] = useDeletePostsMutation();
  const [mailPosts] = useMailPostsMutation();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const refreshPosts = () => {
    client.refetchQueries({
      include: [GetPostListDocument],
    });
  };

  const total = data.posts?.total;
  const pageSize = Pagination.PAGE_NUMBER;

  return (
    <PostList heading='목록' total={total} currentPage={currentPage} pageSize={pageSize}
              posts={data.posts ? data.posts.data : []} refreshPosts={refreshPosts}
              deletePosts={deletePosts} mailPosts={mailPosts} />
  );
}

export default MainPage;
