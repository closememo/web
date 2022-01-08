import { RESTDataSource } from 'apollo-datasource-rest';
import { RequestOptions } from 'apollo-datasource-rest/dist/RESTDataSource';
import { ValueOrPromise } from 'apollo-server-types';

class NoticeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_SERVER;
  }

  protected willSendRequest(request: RequestOptions): ValueOrPromise<void> {
    request.headers.set('X-ACCESS-TOKEN', this.context.accessToken);
    request.headers.set('X-SYNC-TOKEN', this.context.syncToken);
  }

  protected didEncounterError(error: Error, _request: Request) {
    console.log('[ERROR]:\n' + JSON.stringify(error));
    super.didEncounterError(error, _request);
  }

  protected didReceiveResponse<TResult = any>(response: Response, _request: Request): Promise<TResult> {
    const cacheKey = this.cacheKeyFor(_request);
    this.memoizedResults.delete(cacheKey);
    return super.didReceiveResponse(response, _request);
  }

  public async getNoticeListElements() {
    return await this.get('/query/client/notice-list-elements');
  }

  public async getNotice({ noticeId }: { noticeId: string }) {
    return await this.get(`/query/client/notices/${noticeId}`);
  }
}

export default NoticeAPI;
