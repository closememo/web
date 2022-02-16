import React, { useEffect, useState } from 'react';
import LocalWrite from 'client/components/local/LocalWrite';
import LocalList from 'client/components/local/LocalList';
import PersonalLocalCache from 'client/cache/PersonalLocalCache';

export interface LocalPost {
  id: string,
  title: string,
  content: string
}

function LocalPage() {

  const isBrowser: boolean = typeof (window) !== 'undefined';

  const [currentId, setCurrentId] = useState(null);
  const [posts, setPosts] = useState<LocalPost[]>([]);

  const refresh = async () => {
    if (isBrowser) {
      let postIds: string[] | null = await PersonalLocalCache.getLocalPostIds();
      if (postIds === null) postIds = [];
      postIds.reverse();

      const currentPosts: LocalPost[] = await Promise.all(
        postIds.map(async (postId: string) => {
          return await PersonalLocalCache.getLocalPost(postId) as LocalPost;
        }),
      );
      setPosts(currentPosts.filter(localPost => !!localPost));
    }
  };

  useEffect(() => {
    refresh().then();
  }, []);

  return (
    <>
      <LocalWrite currentId={currentId} setCurrentId={setCurrentId} refresh={refresh} />
      <hr />
      <LocalList posts={posts} setCurrentId={setCurrentId} />
    </>
  );
}

export default LocalPage;
