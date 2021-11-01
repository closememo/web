import React, { useEffect, useState } from 'react';
import LocalWrite from 'client/components/local/LocalWrite';
import LocalList from 'client/components/local/LocalList';
import * as localforage from 'localforage';

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
      let postIds: string[] | null = await localforage.getItem('postIds');
      if (postIds === null) postIds = [];
      postIds.reverse();

      const currentPosts: LocalPost[] = await Promise.all(
        postIds.map(async (postId: string) => {
          return await localforage.getItem(postId) as LocalPost;
        }),
      );
      setPosts(currentPosts);
    }
  };

  useEffect(() => {
    refresh().then();
  }, []);

  return (
    <>
      <LocalWrite localforage={localforage} currentId={currentId}
                  setCurrentId={setCurrentId} refresh={refresh} />
      <hr />
      <LocalList posts={posts} setCurrentId={setCurrentId} />
    </>
  );
}

export default LocalPage;
