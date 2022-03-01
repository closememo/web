import BookmarkAPI from 'apollo/datasources/bookmark';

interface DataSources {
  bookmarkAPI: BookmarkAPI;
}

export default {
  Mutation: {
    createBookmark: async (_: any, { postId }: { postId: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.bookmarkAPI.createBookmark(postId);
    },
    deleteBookmark: async (_: any, { postId }: { postId: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.bookmarkAPI.deleteBookmark(postId);
    }
  },
};
