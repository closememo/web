import UserAPI from 'apollo/datasources/user';

interface DataSources {
  userAPI: UserAPI
}

export default {
  Query: {
    me: async (_: any, __: any, { dataSources }: { dataSources: DataSources }): Promise<{ isLoggedIn: boolean }> => {
      return await dataSources.userAPI.getLoggedInUser();
    },
  },
};
