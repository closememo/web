import AbstractApi from 'apollo/datasources/abstractApi';

class DifferenceAPI extends AbstractApi {

  public async getDifferences(documentId: string) {
    return await this.get('/query/client/differences-by-document-id?documentId=' + documentId);
  }

  public async getDifference(differenceId: string) {
    return await this.get(`/query/client/differences/${differenceId}`);
  }
}

export default DifferenceAPI;
