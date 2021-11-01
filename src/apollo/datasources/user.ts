import { RESTDataSource } from 'apollo-datasource-rest';
import { RequestOptions } from 'apollo-datasource-rest/dist/RESTDataSource';
import { ValueOrPromise } from 'apollo-server-types';
import { ApolloError } from '@apollo/client';

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_SERVER;
  }

  protected willSendRequest(request: RequestOptions): ValueOrPromise<void> {
    request.headers.set('X-ACCESS-TOKEN', this.context.accessToken);
    request.headers.set('X-SYNC-TOKEN', this.context.syncToken);
  }

  protected didEncounterError(error: Error, _request: Request) {
    console.log("[ERROR]:\n" + JSON.stringify(error));
    super.didEncounterError(error, _request);
  }

  protected didReceiveResponse<TResult = any>(response: Response, _request: Request): Promise<TResult> {
    const cacheKey = this.cacheKeyFor(_request);
    this.memoizedResults.delete(cacheKey);
    return super.didReceiveResponse(response, _request);
  }

  public async getLoggedInUser(): Promise<{ isLoggedIn: boolean }> {
    if (!this.context.accessToken) {
      return { isLoggedIn: false };
    }

    try {
      const response = await this.get('/query/client/accounts/me');
      return response ? response : { isLoggedIn: false };
    } catch (error) {
      if (error instanceof ApolloError) {
        console.log('[ERROR] ApolloError: login check failed.\n' +
          'URL= ' + this.baseURL + '/query/client/accounts/me\n' +
          'accessToken=' + this.context.accessToken + ', syncToken=' + this.context.syncToken);
      }
      return { isLoggedIn: false };
    }
  }
}

export default UserAPI;
