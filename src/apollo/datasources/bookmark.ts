import AbstractApi from 'apollo/datasources/abstractApi';

class BookmarkAPI extends AbstractApi {

  public async createBookmark(documentId: string) {
    await this.post('/command/client/create-bookmark', {
      documentId,
    });
    return true;
  }

  public async deleteBookmark(documentId: string) {
    await this.post('/command/client/delete-bookmark', {
      documentId,
    });
    return true;
  }
}

export default BookmarkAPI;
