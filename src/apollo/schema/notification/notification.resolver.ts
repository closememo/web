import NotificationAPI from 'apollo/datasources/notification';

interface DataSources {
  notificationAPI: NotificationAPI
}

export default {
  Query: {
    currentNotification: async (_: any, __: any, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.notificationAPI.getCurrentNotification();
    }
  },
};
