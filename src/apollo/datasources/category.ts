import { RESTDataSource } from 'apollo-datasource-rest';
import { RequestOptions } from 'apollo-datasource-rest/dist/RESTDataSource';
import { ValueOrPromise } from 'apollo-server-types';

class CategoryAPI extends RESTDataSource {
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

  public async getCategories() {
    return await this.get('/query/client/categories');
  }

  public async createCategory({ name, parentId }: { name: string, parentId?: string }) {
    await this.post('/command/client/create-category', {
      name, parentId,
    });
    return true;
  }

  public async updateCategory({ categoryId, name }: { categoryId: string, name: string }) {
    await this.post('/command/client/update-category', {
      categoryId, name,
    });
    return true;
  }

  public async deleteCategory({ categoryId }: { categoryId: string }) {
    await this.post('/command/client/delete-category', {
      categoryId,
    });
    return true;
  }
}

export default CategoryAPI;
