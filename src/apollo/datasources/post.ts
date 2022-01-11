import AbstractApi from 'apollo/datasources/abstractApi';

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

class PostAPI extends AbstractApi {

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
