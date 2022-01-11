import AbstractApi from 'apollo/datasources/abstractApi';

class NoticeAPI extends AbstractApi {

  public async getNoticeListElements() {
    return await this.get('/query/client/notice-list-elements');
  }

  public async getNotice({ noticeId }: { noticeId: string }) {
    return await this.get(`/query/client/notices/${noticeId}`);
  }
}

export default NoticeAPI;
