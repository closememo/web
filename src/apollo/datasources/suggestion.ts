import { RESTDataSource } from 'apollo-datasource-rest';
import { RequestOptions } from 'apollo-datasource-rest/dist/RESTDataSource';
import { ValueOrPromise } from 'apollo-server-types';

class SuggestionAPI extends RESTDataSource {
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

  public async getSuggestions() {
    return await this.get('/query/client/suggestions');
  }

  public async getSuggestion({ suggestionId }: { suggestionId: string }) {
    return await this.get(`/query/client/suggestions/${suggestionId}`);
  }

  public async createSuggestion({ content }: { content: string }) {
    await this.post('/command/client/create-suggestion', {
      content,
    });
    return true;
  }

  public async updateSuggestion({ suggestionId, content }: { suggestionId: string, content: string }) {
    await this.post('/command/client/update-suggestion', {
      suggestionId,
      content,
    });
    return true;
  }

  public async deleteSuggestion({ suggestionId }: { suggestionId: string }) {
    await this.post('/command/client/delete-suggestion', {
      suggestionId,
    });
    return true;
  }
}

export default SuggestionAPI;
