import PostAPI from 'apollo/datasources/post';

interface DataSources {
  postAPI: PostAPI;
}

interface NewPost {
  categoryId: string | null | undefined;
  title: string;
  content: string;
  tags: [string];
  option: {
    hasAutoTag: boolean;
  }
}

interface NewLocalPost {
  title: string;
  content: string;
  localFormedDateString: string;
}

interface UpdatePost {
  id: string;
  title: string;
  content: string;
  tags: [string];
  option: {
    hasAutoTag: boolean;
  }
}

interface PostsRequest {
  categoryId: string | null | undefined;
  page: number;
  limit: number;
  orderType: string | null | undefined;
}

export default {
  Query: {
    posts: async (_: any, { categoryId, page, limit, orderType }: PostsRequest, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.postAPI.getPosts({ categoryId, page, limit, orderType });
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
    createLocalPosts: async (_: any, { newLocalPosts }: { newLocalPosts: NewLocalPost[] }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.postAPI.createLocalPosts(newLocalPosts);
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
