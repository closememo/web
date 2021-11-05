import PostAPI from 'apollo/datasources/post';

interface DataSources {
  postAPI: PostAPI
}

interface NewPost {
  title: string,
  content: string,
  tags: [string]
}

interface UpdatePost {
  id: string,
  title: string,
  content: string,
  tags: [string]
}

export default {
  Query: {
    posts: async (_: any, __: any, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.postAPI.getPosts();
    },
    post: async (_: any, { id }: { id: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.postAPI.getPostById({ id });
    },
    searchPostsByTag: async (_: any, { tag }: { tag: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.postAPI.searchPostsByTag({ tag });
    },
  },
  Mutation: {
    createNewPost: async (_: any, newPost: NewPost, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.postAPI.createPost(newPost);
    },
    deletePost: async (_: any, { id }: { id: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.postAPI.deletePost(id);
    },
    deletePosts: async (_: any, { ids }: { ids: string[] }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.postAPI.deletePosts(ids);
    },
    updatePost: async (_: any, post: UpdatePost, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.postAPI.updatePost(post);
    },
    mailPosts: async (_: any, { ids }: { ids: string[] }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.postAPI.mailPosts(ids);
    },
  },
};
