import AbstractApi from 'apollo/datasources/abstractApi';

class CategoryAPI extends AbstractApi {

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
