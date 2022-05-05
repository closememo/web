import { RESTDataSource } from 'apollo-datasource-rest';
import { RequestOptions } from 'apollo-datasource-rest/dist/RESTDataSource';
import { ValueOrPromise } from 'apollo-server-types';
import { ApolloError } from 'apollo-server-errors';
import { ApiError } from 'apollo/datasources/apiError';

interface ErrorResponse {
  error: {
    type: string;
    message: string | null;
  }
}

abstract class AbstractApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_SERVER;
  }

  protected willSendRequest(request: RequestOptions): ValueOrPromise<void> {
    request.headers.set('X-USER-IP', this.context.userIp)
    request.headers.set('X-ACCESS-TOKEN', this.context.accessToken);
  }

  protected didEncounterError(error: Error, _request: Request) {
    console.log('[ERROR]: ' + JSON.stringify(error));
    if (error instanceof ApolloError) {
      const response: ErrorResponse = error.extensions.response.body as ErrorResponse;
      if (!!response) {
        throw new ApiError(response.error.type);
      }
    }
    super.didEncounterError(error, _request);
  }

  protected didReceiveResponse<TResult = any>(response: Response, _request: Request): Promise<TResult> {
    const cacheKey = this.cacheKeyFor(_request);
    this.memoizedResults.delete(cacheKey);
    return super.didReceiveResponse(response, _request);
  }
}

export default AbstractApi;
