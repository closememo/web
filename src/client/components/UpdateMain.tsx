import React, { useEffect } from 'react';
import { useGetPostQuery } from 'apollo/generated/hooks';
import Loading from 'client/components/Loading';
import PostForm from 'client/components/PostForm';
import { Post } from 'apollo/generated/types';

function UpdateMain({ id, setCategoryId }: { id: string, setCategoryId: Function }) {

  const { data, error, loading } = useGetPostQuery({
    variables: { id },
  });

  const post: Post | undefined = data?.post;

  useEffect(() => {
    if (!!post) {
      setCategoryId(post.categoryId);
    }
  }, [post]);

  if (loading) return <Loading />;
  if (error || !data || !post) return <p>Error</p>;

  return (
    <PostForm categoryId={post.categoryId} id={id} currentTitle={post.title} currentContent={post.content}
              currentTags={post.tags} currentOption={post.option} diffCount={post.diffCount}/>
  );
}

export default UpdateMain;
