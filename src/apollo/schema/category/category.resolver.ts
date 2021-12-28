import CategoryAPI from 'apollo/datasources/category';

interface DataSources {
  categoryAPI: CategoryAPI
}

export default {
  Query: {
    categories: async (_: any, __: any, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.categoryAPI.getCategories();
    },
  },
  Mutation: {
    createCategory: async (_: any, { name, parentId }: { name: string, parentId: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.categoryAPI.createCategory({ name, parentId });
    },
    updateCategory: async (_: any, { categoryId, name }: { categoryId: string, name: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.categoryAPI.updateCategory({ categoryId, name });
    },
    deleteCategory: async (_: any, { categoryId }: { categoryId: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.categoryAPI.deleteCategory({ categoryId });
    },
  },
};
