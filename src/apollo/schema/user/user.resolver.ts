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
  recentlyViewedCategoryId?: string
}

interface UpdateAccountOptionParams {
  documentOrderType: string;
  documentCount: number;
}

interface UpdateAccountTrackParams {
  recentlyViewedCategoryId: string;
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
    },
    updateAccountTrack: async (_: any, { recentlyViewedCategoryId }: UpdateAccountTrackParams, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.userAPI.updateAccountTrack(recentlyViewedCategoryId);
    },
  }
};
