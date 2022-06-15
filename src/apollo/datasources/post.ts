import AbstractApi from 'apollo/datasources/abstractApi';

interface NewPost {
  categoryId: string | null | undefined;
  title: string;
  content: string;
  tags: [string];
  option: {
    hasAutoTag: boolean;
  }
}

interface newLocalPost {
  title: string;
  content: string;
  localFormedDateString: string;
}

interface UpdatePost {
  id: string;
  title: string;
  content: string;
  tags: [string];
  option: {
    hasAutoTag: boolean;
  }
}

interface PostsRequest {
  categoryId: string | null | undefined;
  page: number;
  limit: number;
  orderType: string | null | undefined;
}

class PostAPI extends AbstractApi {

  public async getPosts({ categoryId, page, limit, orderType }: PostsRequest) {
    let path = '/query/client/documents?page=' + page + '&limit=' + limit;
    if (!!categoryId) {
      path += '&categoryId=' + categoryId;
    }
    if (!!orderType) {
      path += '&orderType=' + orderType;
    }
    return await this.get(path);
  }

  public async getPostById({ id }: { id: string }) {
    return await this.get(`/query/client/documents/${id}`);
  }

  public async searchPostsByTag({ tag }: { tag: string }) {
    return await this.get('/query/client/documents-by-tag?tag=' + tag);
  }

  public async bookmarkedPosts() {
    return await this.get('/query/client/bookmarked-documents');
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
        hasAutoTag: post.option.hasAutoTag,
      },
    });
    return {
      success: true,
      id: response.id,
    };
  }

  public async changePostsCategory(categoryId: string, ids: string[]) {
    const response = await this.post('/command/client/change-documents-category', {
      categoryId,
      documentIds: ids,
    });
    return true;
  }

  public async mailPosts(ids: string[]) {
    const response = await this.post('/command/client/mail-documents', {
      documentIds: ids,
      needToDelete: true,
    });
    return true;
  }

  public async clearDifferences(id: string) {
    await this.post('/command/client/clear-document-differences', {
      documentId: id,
    });
    return true;
  }
}

export default PostAPI;
