import { RESTDataSource } from 'apollo-datasource-rest';
import { RequestOptions } from 'apollo-datasource-rest/dist/RESTDataSource';
import { ValueOrPromise } from 'apollo-server-types';

interface NewPost {
  categoryId: string | null | undefined,
  title: string,
  content: string,
  tags: [string],
  option: {
    hasAutoTag: boolean
  }
}

interface newLocalPost {
  title: string,
  content: string,
  localFormedDateString: string
}

interface UpdatePost {
  id: string,
  title: string,
  content: string,
  tags: [string],
  option: {
    hasAutoTag: boolean
  }
}

interface PostsRequest {
  categoryId: string | null | undefined,
  page: number,
  limit: number
}

class PostAPI extends RESTDataSource {
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

  public async getPosts({ categoryId, page, limit }: PostsRequest) {
    let path = '/query/client/documents?page=' + page + '&limit=' + limit
    if (!!categoryId) {
      path += '&categoryId=' + categoryId;
    }
    return await this.get(path);
  }

  public async getPostById({ id }: { id: string }) {
    return await this.get(`/query/client/documents/${id}`);
  }

  public async searchPostsByTag({ tag }: { tag: string }) {
    return await this.get('/query/client/documents-by-tag?tag=' + tag);
  }

  public async createPost(newPost: NewPost) {
    const response = await this.post('/command/client/create-document', newPost);
    return {
      success: true,
      id: response.id,
    };
  }

  public async createLocalPosts(newLocalPosts: newLocalPost[]) {
    const response = await this.post('/command/client/create-local-documents', {
      localDocuments: newLocalPosts,
    });
    return {
      success: true,
      ids: response.map((obj: { id: string }) => obj.id),
    };
  }

  public async deletePost(id: string) {
    const response = await this.post('/command/client/delete-document', {
      documentId: id,
    });
    return true;
  }

  public async deletePosts(ids: string[]) {
    const response = await this.post('/command/client/delete-documents', {
      documentIds: ids,
    });
    return true;
  }

  public async updatePost(post: UpdatePost) {
    const response = await this.post('/command/client/update-document', {
      documentId: post.id,
      title: post.title,
      content: post.content,
      tags: post.tags,
      option: {
        hasAutoTag: post.option.hasAutoTag
      }
    });
    return {
      success: true,
      id: response.id,
    };
  }

  public async mailPosts(ids: string[]) {
    const response = await this.post('/command/client/mail-documents', {
      documentIds: ids,
      needToDelete: true,
    });
    return true;
  }
}

export default PostAPI;
