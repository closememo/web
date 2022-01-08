import NoticeAPI from 'apollo/datasources/notice';

interface DataSources {
  noticeAPI: NoticeAPI
}

export default {
  Query: {
    noticeListElements: async (_: any, __: any, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.noticeAPI.getNoticeListElements();
    },
    notice: async (_: any, { noticeId }: { noticeId: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.noticeAPI.getNotice({ noticeId });
    },
  },
};
