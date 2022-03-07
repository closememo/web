import UserAPI from 'apollo/datasources/user';

interface DataSources {
  userAPI: UserAPI
}

interface Me {
  id: string;
  isLoggedIn: boolean;
  isTempUser?: boolean;
  documentOrderType?: string;
  documentCount?: number;
}

interface UpdateAccountOptionParams {
  documentOrderType: string;
  documentCount: number;
}

export default {
  Query: {
    me: async (_: any, __: any, { dataSources }: { dataSources: DataSources }): Promise<Me> => {
      return await dataSources.userAPI.getLoggedInUser();
    },
  },
  Mutation: {
    updateAccountOption: async (_: any, { documentOrderType, documentCount }: UpdateAccountOptionParams, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.userAPI.updateAccountOption(documentOrderType, documentCount);
    }
  }
};
